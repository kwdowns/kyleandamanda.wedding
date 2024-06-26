const fs = require("fs");
const path = require("path");

generateGalleryImageExports();

function generateGalleryImageExports() {
  let imports = "";
  let exports = [];
  const galleryPath = "./public/gallery";
  const exportsFilePath = "./src/data/galleryImages.ts";

  fs.writeFileSync(exportsFilePath, "");

  const files = fs.readdirSync(galleryPath).filter((file) => {
    const extension = path.extname(file).toLowerCase();
    return [".jpg", ".png", ".jpeg", ".gif"].includes(extension);
  });

  exports["images"] = "export const images = [ ";

  files.forEach((file) => {
    const importPath = path.relative(
      "./src/data",
      path.join(galleryPath, file),
    );
    const symbol = path.parse(file).name;

    imports += `import ${symbol} from '${importPath}';\r\n`;
    exports["images"] += `\r\n  ${symbol},`;
  });

  const subDirs = fs
    .readdirSync(galleryPath, { withFileTypes: true })
    .filter((x) => x.isDirectory())
    .map((x) => x.name);

  subDirs.forEach((subDir) => {
    const subDirPath = path.join(galleryPath, subDir);
    const subFiles = fs.readdirSync(subDirPath).filter((file) => {
      const extension = path.extname(file).toLowerCase();
      return [".jpg", ".png", ".jpeg", ".gif"].includes(extension);
    });

    subFiles.forEach((file) => {
      const importPath = path.relative(
        "./src/data",
        path.join(subDirPath, file),
      );
      const symbol = path.parse(file).name;

      if (exports[subDir] === undefined) {
        exports[subDir] = `export const ${subDir} = [`;
      }

      exports[subDir] += `\r\n ${symbol},`;
      imports += `import ${symbol} from '${importPath}';\r\n`;
    });
  });

  let subexportStatements = "";

  for (let subDir in exports) {
    let subexportStatement = exports[subDir];
    subexportStatement = subexportStatement.substring(
      0,
      subexportStatement.length - 1,
    );
    subexportStatement += "\r\n];";
    subexportStatements += `\r\n\r\n${subexportStatement}`;
  }

  const content = `// Generated by prebuild.js\r\n\r\n${imports}\r\n${subexportStatements}`;

  const existingFileContent = fs.readFileSync(exportsFilePath, "utf8");

  if (content === existingFileContent) {
    console.log("No changes detected in gallery images.");
    return;
  }
  fs.writeFileSync(exportsFilePath, content.replace(/\\/g, "/"));
}
