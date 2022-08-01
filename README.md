# Journal Easy

### Update the package files:

-   from root dir \
     **`pipenv install -d dependencies.txt`**
-   from ../react-app \
     **`npm install`**

### Run local development server:

-   from root dir \
     **`pipenv shell`**
    **`pipenv run flask run`**
-   from ../react-app \
     RUN **`npm start`**

### TODO

-   **combine** the `affirmations`, `entries` & `ratings` into a new table
    labelled `Content` mapped to the corresponding `User` through the following
    joins table `{ id (pk), user_id (fk), contentId (fk) }`

    enum types: `{0: Affirmation 1: DailyEntry 2: Rating}`

    Content: `{ id: (pk), * type: enum, content: array of strings }`
    
    the array in the content row will depend on: \
    `type === 0 ? array.length = 1 (affirmation)` \
    `type === 1 ? array.length = 2 (prompt, response)` \
    `type === 2 ? array.length = 1 (rating as string)` \
    

-   **testing** using jest and RTL
-   **styles** decide which package to use (MUI?)

Live Site: https://journal-easy.herokuapp.com/
