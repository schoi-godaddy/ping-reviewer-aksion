const core = require("@actions/core");
const github = require("@actions/github");

module.exports = async function run() {
  try {
    // `who-to-ping` input defined in action metadata file
    const nameToPing = core.getInput("who-to-ping");
    const time = new Date().toTimeString();
    core.setOutput("time", time);
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);

    if (!process.env.GITHUB_TOKEN) {
      throw new Error("GITHUB_TOKEN environment variable not found.");
    }

    const client = github.getOctokit(process.env.GITHUB_TOKEN);

    const contextPullRequest = github.context.payload.pull_request;
    if (!contextPullRequest) {
      throw new Error(
        "This action can only be invoked in `pull_request_target` or `pull_request` events. Otherwise the pull request can't be inferred."
      );
    }

    const owner = contextPullRequest.base.user.login;
    const repo = contextPullRequest.base.repo.name;

    await client.request(
      "POST /repos/:owner/:repo/issues/:issue_number/comments",
      {
        owner,
        repo,
        issue_number: contextPullRequest.number,
        body: `Hey @${nameToPing}, I am pinging you from "Ping Reviewer Aksion."`,
      }
    );
  } catch (error) {
    core.setFailed(error.message);
  }
};
