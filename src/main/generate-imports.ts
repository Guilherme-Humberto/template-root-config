import { GenerateImports } from "@/infra/helpers/imports";
import { applications } from "./applications";

const generatorImportFile = new GenerateImports(applications);
generatorImportFile.create();
