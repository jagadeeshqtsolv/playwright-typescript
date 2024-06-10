import { test, expect } from '@playwright/test';
import { ApiFunctions } from '../utils/APiUtils';
import config from '../playwright.config';

// Create an instance of the ApiFunctions class
const apiFunctions = new ApiFunctions();

test('@API TC_PostUser_001_Validate_SuccessfulCreateUserRequest', async ({}) => {
    const createUserEndpoint = config.apiUrl + '/users';
    const createUserHeaders = {
        'Content-Type': 'application/json',
    };
    const createUserPayload = {
      "name": "jagadeesh",
      "job": "madhura"
    };

    // Execute the API request
    const postResponse = await apiFunctions.doPost(createUserEndpoint, createUserHeaders, createUserPayload);

    // Log request and response details to console
    console.log('POST Request:', { method: 'POST', url: createUserEndpoint, headers: createUserHeaders, body: createUserPayload });
    console.log('POST Response:', postResponse);

    // Perform assertions
    expect(await postResponse.name).toBe("jagadeesh");
});