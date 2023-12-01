const My = require("./package/my");
const fs = require("node:fs");
const flags = My.Flags({ update_index: true }, process.argv);
if (flags.exit) {
  return;
}
const page = process.argv.at(2);

if (page == null) {
  My.Error(" Missing name of the page");
  return;
}
My.Print(`Removing page: ${page}`);
try {
  fs.rmSync(`pages/${page}.html`);
} catch (error) {
  My.Error(error.message);
  return;
}
My.Print("Operation Completed Successfully");
if (flags.update_index) require("./create_index");
