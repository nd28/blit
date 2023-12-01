var fs = require("fs");
const My = require("./package/my");
var template_page_listing = "";
My.Print("Reading listing_template");
try {
  template_page_listing = fs
    .readFileSync("template/page_listing.html")
    .toLocaleString();
  if (template_page_listing == "") {
    My.Error("Empty page_listing.html file");
    return;
  }
} catch (error) {
  My.Error(error.message);
  return;
}
// My.Print("\n\n" + My.Indent(listing_template, 4));

var content = "";
My.Print("Reading index_template for modification later");
try {
  content = fs.readFileSync("template/index.html").toString();
  if (content == null) My.Error("Empty index.html");
} catch (error) {
  My.Error(error);
}
// My.Print(content);

const replacer = "        <!-- {{INJECT PAGES LISTING}} -->";
var padding = 0;

My.Print("Calculating index size");
for (padding = 0; replacer[padding] === " "; padding++);

var generated = "";
try {
  var temp = fs.readdirSync("pages");
  if (temp.length === 0) {
    My.Error("No files. Please add some files in pages directory.");
    return;
  } else {
    My.Print(`Found ${temp.length} page`);
  }
  My.Print("Generating List");
  temp = temp.map((name) =>
    template_page_listing
      .replaceAll("[[path]]", "pages/" + name)
      .replaceAll("[[title]]", name.replace(".html", ""))
  );
  temp = temp.map((line) =>
    My.Indent(line.substring(0, line.length - 1), padding)
  );
  generated = temp.join("\n");
} catch (error) {
  My.Error(error.message);
  return;
}
// My.Print("\n\n" + generated);
My.Print("Writing in index.html");
try {
  fs.writeFileSync("index.html", content.replace(replacer, generated));
} catch (error) {
  My.Error(error.message);
  return;
}
My.Print("Operation Completed Successfully");
