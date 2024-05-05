document.addEventListener("DOMContentLoaded", () => {
  const pageContent = document.getElementById('page-content')
  console.log(pageContent)
  const applicationsNames = ['nomadito'];

  for (const app of applicationsNames) {
    const div = document.createElement('div');
    div.id = `single-spa-application@microsaas/${app}`;
    pageContent.appendChild(div);
  }
});

