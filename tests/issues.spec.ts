import { test, expect } from '@playwright/test';
import defaults from '../config/defaults.json';
import endpoints from '../config/endpoints.json';
import issues_data from '../testdata/issues_data.json';

test.describe('Validate total counts for different issue related stuff', () => {
	test('Validate total no of issues @api', async ({ request }) => {
		const _response = await request.get(defaults.baseUrl + endpoints.issues.issues);

		expect(_response.ok()).toBeTruthy()
		expect(_response.status()).toEqual(200)
		const resBody = await _response.json()

		var numberOfIssuess = resBody.length
		console.log('Number of Issues:', numberOfIssuess);
		expect(numberOfIssuess == issues_data.totalIssues).toBeTruthy();
	});

	test('Validate total no of comments @api', async ({ request }) => {
		const _response = await request.get(defaults.baseUrl + endpoints.issues.issuesComments);

		expect(_response.ok()).toBeTruthy()
		expect(_response.status()).toEqual(200)
		const resBody = await _response.json()

		var numberOfComments = resBody.length
		console.log('Number of comments for issues:', numberOfComments);
		expect(numberOfComments == issues_data.totalComments).toBeTruthy();
	});

	test('Validate total no of events @api', async ({ request }) => {
		const _response = await request.get(defaults.baseUrl + endpoints.issues.issuesEvents);

		expect(_response.ok()).toBeTruthy()
		expect(_response.status()).toEqual(200)
		const resBody = await _response.json()

		var numberOfEvents = resBody.length
		console.log('Number of Events:', numberOfEvents);
		expect(numberOfEvents == issues_data.totalEvents).toBeTruthy();
	});

	test('Validate total no of lables @api', async ({ request }) => {
		const _response = await request.get(defaults.baseUrl + endpoints.issues.issuesLabels);

		expect(_response.ok()).toBeTruthy()
		expect(_response.status()).toEqual(200)
		const resBody = await _response.json()

		var numberOfLabels = resBody.length
		console.log('Number of Labels for issues:', numberOfLabels);
		expect(numberOfLabels == issues_data.totalLabels).toBeTruthy();
	});

	test('Validate total no of assigness for different issues @api', async ({ request }) => {
		const _response = await request.get(defaults.baseUrl + endpoints.issues.assignees);

		expect(_response.ok()).toBeTruthy()
		expect(_response.status()).toEqual(200)
		const resBody = await _response.json()

		var numberOfAssignees = resBody.length
		console.log('Number of Labels for issues:', numberOfAssignees);
		expect(numberOfAssignees == issues_data.totalAssignees).toBeTruthy();
	});
})

test('Validate issue number 1 details', async ({ request }) => {
	const endpoint = endpoints.issues.issues + '/' + issues_data.issue_number1.number
	const _response = await request.get(defaults.baseUrl + endpoint);

	expect(_response.ok()).toBeTruthy()
	expect(_response.status()).toEqual(200)
	const resBody = await _response.json()

	expect(resBody.id == issues_data.issue_number1.id).toBeTruthy();
	expect(resBody.title == issues_data.issue_number1.title).toBeTruthy();
	expect(resBody.state == issues_data.issue_number1.state).toBeTruthy();
	expect(resBody.body == issues_data.issue_number1.body).toBeTruthy();
	expect(resBody.user.login == issues_data.issue_number1.login).toBeTruthy();
})