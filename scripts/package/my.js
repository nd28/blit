module.exports = {
  Error: (params, crash = false) => {
    console.error("[ERROR] ", params);
    if (crash) throw { message: params };
  },
  Print: (params) => {
    console.log("[INFO] ", params);
  },
  Indent: (str, size = 0) => {
    // My.Print(JSON.stringify(str));
    var temp = Array(size).join(" ");
    temp = str
      .split("\n")
      .map((str) => temp + str)
      .join("\n");
    return temp;
  },
  Flags: function (schema = {}, argv = []) {
    if (schema == null || typeof schema !== "object" || Array.isArray(schema)) {
      return {};
    }
    // this.Print("Reading flags");
    var flags = argv.filter((str) => String(str).startsWith("--"));
    // Remove from argv, reduce flag noise
    flags.forEach((flag) => {
      var temp = argv.findIndex((arg) => arg === flag);
      if (temp === -1) return;
      temp = argv.splice(temp, 1);
      // this.Print(temp);
    });
    // Cleaning up flags
    flags = flags.map((str) => String(str).substring(2).replaceAll("-", "_"));
    // Updating schema
    const keys = Object.keys(schema);
    keys.forEach((name) => {
      // true or enable
      if (flags.includes(name)) {
        schema[name] = true;
      }
      // false or disable
      if (flags.includes("no_" + name)) {
        schema[name] = false;
      }
    });
    // need help ??
    if (flags.includes("h") || flags.includes("help")) {
      this.Print("Help");
      this.Print("." + "".padEnd(40, "-") + ".");
      this.Print(
        "|" +
          "name".padStart(20, " ") +
          " : " +
          "value".padEnd(20 - 3, " ") +
          "|"
      );
      this.Print("|" + "".padEnd(40, "-") + "|");
      keys.forEach((name) => {
        this.Print(
          "|" +
            name.toString().padStart(20, " ") +
            " : " +
            schema[name].toString().padEnd(20 - 3, " ") +
            "|"
        );
      });
      this.Print("\\" + "".padEnd(40, "_") + "/");
      // this.Print(" " + "".padEnd(40, "-") + " ");
      return { exit: true };
    }
    return schema;
  },
};
