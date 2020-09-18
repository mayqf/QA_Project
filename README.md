# Realworld App New Post Test with Cypress 

For setting up the environment to execute this test existed in this repo, please run the following commands:

**clone this repo to a local directory (HTTP)**

git clone https://github.com/mayqf/QA_Project-.git

**cd into the cloned repo**

cd realworld_cypress

**install the node_modules**

npm install

**open cypress test runner tool**

npx cypress open

**click on the title of the wanted test for execution**

**the browser selected by the test runner tool will be opened and start executing the test**

---

**Test cases implemented (Happy Path Scenarios):**
1.  Check Only The Title is Mandatory.
2.  Check No limits for characters for any of the fields.
3.  Check Only logged in users can create article.
4.  Check Tags that doesn't exist are created automatically.
5.  Check Only Only text is allowed.
6.  Check the Success message after pusblishing article with title and directed to home page.
7.  Check no draft saved and all changes are lost if user navigates away from the article before publishing.

After test, 4 is succesfull. Others failed.




