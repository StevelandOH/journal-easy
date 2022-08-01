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

-   combine the three user tables (affirmations, entries & ratings) into a new table
    labelled `Content`

    User to Content model: {
    id (pk),
    user_id (fk),
    contentId (fk)
    }

    enum type object: {
    0: Affirmation
    1: DailyEntry
    2: Rating
    }

    new Content model: {
    id: (pk), \* type: enum,
    content: array of strings (
    type === 0 ? array.length = 1 (affirmation)
    type === 1 ? array.length = 2 (prompt, response)
    type === 2 ? array.length = 1 (rating as string)
    )
    }

-   testing

Live Site: https://journal-easy.herokuapp.com/
