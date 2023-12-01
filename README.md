# ✨ blit ✨

## Utility framework for creating MPA using node (v20)

> It is fairly small codebase so you can use your programming to understand the usafge without this documentation. And make it better if you want.

---

### Installation:

`git clone https://github.com/nd28/blit`

It has zero external package dependency so having node installed is more than needed. 😆


Serve page http-server with watch mode on.
Or Use VS Code's Live Server

#### Page layout is modifying index template.

`vim template/index.html`

> roadmap: So able to add new replacer tags in template and use user-defined function to handle the replacers

#### Currently it has very simple operations like add new and delete

1. `new_page`
1. `rm_page`

🥳 these are working fine.

If you want to create a new page called to test to write about something(like test).

`yarn new_page test`

This will create a page inside pages directory and modify the index for listing.

> NOTE: if you use http-server to serve the pages you would see hot-reloading out of the box. LOL. I didn't have to do anything. Bravo to http-server

This is to remove the page test you created, and modify the listing in index page.

`yarn rm_page test`

So modifying the page listing in index is optional. You can use flags to opt out.

### Generic Flags

1. `--no-update-index`
   if you need to add but don't want to reflect?
   I don't see why not but just in case.

2. `--update-index`
   This one is opposite of above, this is set by default
   I do want to update index page on new or delete events.

### Motivation:

I needed static note taking app that is also interacting so easier to demonstrate.
So I started this pages structures like traditional way and it was so less complex. (compare to current status of javascript frameworks it was heaven)
But it was still tedius to update indexing as I create or delete page. And I started writing the script for handling the page listing in index page. And as I starting coding it came more clear and I thought I can also handle the new page and removing the page so it is completely work flow instead of creating page manually copy paste back-links to main page and then run the script to update the page listing.
