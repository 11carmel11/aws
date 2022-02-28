# backend

- Express app deployed as one Lambda [function](https://g5w9fp7e6i.execute-api.eu-west-2.amazonaws.com/dev/)

## scenarios

#### /all

- returns all words without copies as an array.

#### /pos/:pos

- search for a random word that starts with a given/random letter in the given pos.

#### /:word

- search for a word, returns all possible definitions as an array.

#### /:word/:pos

- search for a word in the given pos.
