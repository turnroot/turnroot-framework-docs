// Read the Docs addons integration for mkdocs-shadcn
// Fires when the addons data is ready and injects a version selector into the header.
document.addEventListener(
  "readthedocs-addons-data-ready",
  function (event) {
    const config = event.detail.data();

    const versioning = `
<div class="rtd-version-selector" style="margin-left:1rem;font-size:0.875rem;">
  <span style="opacity:0.6">v:</span>
  <select onchange="window.location.href=this.value" style="background:transparent;border:none;cursor:pointer;">
    ${config.versions.active.map(
      (version) => `<option value="${version.urls.documentation}" ${version.slug === config.versions.current.slug ? "selected" : ""}>${version.slug}</option>`
    ).join("\n")}
  </select>
</div>`;

    // Inject into the shadcn header nav if present, otherwise append to body
    const header = document.querySelector("header nav") || document.querySelector("header") || document.body;
    header.insertAdjacentHTML("beforeend", versioning);
  }
);
