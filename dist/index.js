/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 447:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const core = __nccwpck_require__(570);
const github = __nccwpck_require__(28);

module.exports = async function run() {
  try {
    // `who-to-ping` input defined in action metadata file
    const nameToPing = core.getInput("who-to-ping");
    const time = new Date().toTimeString();
    core.setOutput("time", time);

    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);

    console.log("process.env", process.env);

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


/***/ }),

/***/ 570:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 28:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const run = __nccwpck_require__(447);

run();

})();

module.exports = __webpack_exports__;
/******/ })()
;