import { test, expect } from '@playwright/test';
import { ApiFunctions } from '../../utils/APiUtils';
import config from '../../playwright.config';

// Create an instance of the ApiFunctions class
const apiFunctions = new ApiFunctions();

test('@API TC_GetUser_001_Validate_SuccessfulGetUserRequest', async ({}) => {
    const getUserEndpoint = config.apiUrl + '/users?page=2';
    const getUserHeaders = {
        'Content-Type': 'application/json',
    };

    // Execute the API request
    const getResponse = await apiFunctions.doGet(getUserEndpoint, getUserHeaders);

    // Log request and response details to console
    console.log('GET Request:', { method: 'GET', url: getUserEndpoint, headers: getUserHeaders });
    console.log('GET Response:', getResponse);

    // Perform assertions
    expect(getResponse.page).toBe(2);
});
