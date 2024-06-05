import * as fs from 'fs';
import * as path from 'path';
import * as PDFParser from 'pdf-parse';

export class PDFReader {
    private pdfBytes: Uint8Array;

    constructor(private filePath: string) {
        this.pdfBytes = fs.readFileSync(filePath);
    }

    async loadPDF(): Promise<void> {
        return Promise.resolve();
    }

    async getTotalPages(): Promise<number> {
        const pdf = await this.getPdf();
        return pdf.numpages;
    }

    async getTextFromPage(pageNumber: number): Promise<string> {
        const pdf = await this.getPdf();
        const page = await pdf.getPage(pageNumber);
        return page.getText();
    }

    async getPdf(): Promise<PDFParser> {
        const data = await this.pdfBytes.buffer.slice(this.pdfBytes.byteOffset, this.pdfBytes.byteOffset + this.pdfBytes.byteLength);
        return await PDFParser(data);
    }

    async getMetadata(): Promise<any> {
        const pdf = await this.getPdf();
        return pdf.metadata;
    }

    async search(text: string): Promise<number[]> {
        const pdf = await this.getPdf();
        const searchResults = await pdf.search(text);
        return searchResults.map(result => result.pageIndex + 1); // pageIndex is zero-based
    }

    async getPageDimensions(pageNumber: number): Promise<{ width: number, height: number }> {
        const pdf = await this.getPdf();
        const page = await pdf.getPage(pageNumber);
        const { width, height } = page.getViewport({ scale: 1 });
        return { width, height };
    }

    async extractImages(pageNumber: number): Promise<string[]> {
        const pdf = await this.getPdf();
        const page = await pdf.getPage(pageNumber);
        const images = await page.extractImages();
    
        const tempFolderPath = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempFolderPath)) {
            fs.mkdirSync(tempFolderPath);
        }
    
        const imagePaths: string[] = [];
        for (let i = 0; i < images.length; i++) {
            const imageData = images[i].imageData;
            const imageFileName = `image_${pageNumber}_${i}.png`;
            const imagePath = path.join(tempFolderPath, imageFileName);
            fs.writeFileSync(imagePath, imageData);
            imagePaths.push(imagePath);
        }
    
        return imagePaths;
    }

    async verifyDataPresence(data: string): Promise<boolean> {
        const pdf = await this.getPdf();
        const totalPages = await this.getTotalPages();
        for (let i = 1; i <= totalPages; i++) {
            const text = await this.getTextFromPage(i);
            if (text.includes(data)) {
                return true;
            }
        }
        return false;
    }
    
    
}
