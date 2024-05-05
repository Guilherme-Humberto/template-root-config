import { ApplicationProtocol } from "@/presentation/protocols/application";
import fs from "fs";
import path from "path";

type ImportType = {
  imports: { [key: string]: string };
};

export class GenerateImports {
  private importations: ImportType = { imports: {} };
  constructor(private readonly applications: ApplicationProtocol[]) {}

  create() {
    this.parseApplications();
    const importAppJson = JSON.stringify(this.importations);
    fs.writeFile(
      this.getImportPath(),
      importAppJson.replace(/\s/gi, ""),
      (error) => {
        if (error) return;
        console.log("File created");
      }
    );
  }

  private parseApplications() {
    this.applications.forEach((app) => {
      const appName = `${app.orgName}/${app.projectName}`;
      this.importations.imports[appName] = app.urlApp;
    });
  }

  private getImportPath(): string {
    const fileName = "import-app.json";
    return path.join(__dirname, "..", "..", "..", "build", fileName);
  }
}
