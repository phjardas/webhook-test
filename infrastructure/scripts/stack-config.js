function getBranchStack(ref) {
  const branch = ref.replace(/^refs\/heads\//, "");
  if (branch === "main") return "Qualifyze/prod";
  if (branch === "next") return "Qualifyze/next";
}

function getStackName(event) {
  if (event.action === "deploy") {
    const { stage } = event.client_payload || {};
    return stage && { stack: `Qualifyze/${stage}` };
  }

  if (event.pull_request) {
    // only create previews against known base branches
    const baseStack = getBranchStack(event.pull_request?.base?.ref);
    return (
      baseStack && {
        stack: `Qualifyze/preview-${event.pull_request.number}`,
        baseStack,
      }
    );
  }

  const stack = getBranchStack(event.ref);
  return stack && { stack: getBranchStack(event.ref) };
}

module.exports = { getStackName };
