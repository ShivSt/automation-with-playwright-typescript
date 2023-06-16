import { test, expect } from '@playwright/test';
import defaults from '../config/defaults.json';
import endpoints from '../config/endpoints.json';
import commits_data from '../testdata/commits_data.json';

test('Validate total no of commits',async ({ request }) => {
    const _response = await request.get(defaults.baseUrl + endpoints.commits.commits);

	expect(_response.ok()).toBeTruthy()
    expect(_response.status()).toEqual(200)
	const commits = await _response.json()

	var numberOfCommits = commits.length
	console.log('Number of commits:', numberOfCommits);
	expect(numberOfCommits == commits_data.totalCommits).toBeTruthy();
});

test('Validate total no of comments', async ({ request }) => {
    const _response = await request.get(defaults.baseUrl + endpoints.commits.commitComments);

    expect(_response.ok()).toBeTruthy()
    expect(_response.status()).toEqual(200)
    const commitComments = await _response.json()

    var numberOfComments = commitComments.length
    console.log('Number of comments:', numberOfComments);
    expect(numberOfComments).toEqual(commits_data.totalComments);
});

test('Validate comment for comment with id', async ({request}) => {
    const commentId = commits_data.comment_id1.id
    const _response = await request.get(defaults.baseUrl + endpoints.commits.commitComments + '/' + commentId);

    expect(_response.ok()).toBeTruthy()
    expect(_response.status()).toEqual(200)
    const CommentBody = await _response.json()

    var actualComment = CommentBody.body
    console.log('Actual comment:', actualComment);
    expect(actualComment).toEqual(commits_data.comment_id1.comment);
    expect(CommentBody.commit_id).toEqual(commits_data.comment_id1.commitId);
    expect(CommentBody.user.login).toEqual(commits_data.comment_id1.login);
})