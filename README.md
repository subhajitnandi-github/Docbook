# :notebook_with_decorative_cover: DocBook - A document sharing platform

Read an interesting article :page_with_curl: or research paper or white paper and want to share it with the rest of the world. Docbook provides you with just that. Create doclings of your own or read others'. Don't stop spreading knowledge ! :innocent: :metal:

#### :computer: Currently deployed at [docb.herokuapp.com](http://docb.herokuapp.com)​

> :warning: Please note that as of now it only supports sharing of **.pdf** files. The maximum size allowed is 1 MB.

---

* :monorail: [Run Locally](#user-content-run-locally)​
* :grey_question: [Terminology](#user-content-terminology)
* :books: [Tech Stack](#user-content-tech-stack)
  * :electric_plug: ​[API](#user-content-api)
  * :file_folder: [Database](#user-content-database)​
  * :floppy_disk: [Storage](#user-content-storage)
  * :nail_care: [Front-end](#user-content-front-end)​
    * [State Management](#user-content-state-management)
    * [Responsive Styling](#user-content-responsive-styling)
    * [Displaying the pdf](#user-content-displaying-the-pdf)
  * :key: ​[Authentication](#user-content-authentication)
  * :rocket: ​[Deployment](#user-content-deployment)
* :pencil: [To-Dos](#user-content-to-dos)​
* :star: [Miscellaneous](#user-content-miscellaneous)

---



## Run Locally

To run the web app locally, go to any directory, open terminal and run the following commands:

```bash
$ git clone https://github.com/Kristency/Docbook.git
$ cd Docbook
$ npm install
$ npm start
```

Your app should be up and running on `localhost:3000`



## Terminology

:round_pushpin: **Docling -** ​Its similar to a post on any social media site. It contains the respective creator's name, title of the post , its description and a timestamp.



## Tech Stack

### API

The [API](https://github.com/Kristency/docbook-api) for this app is built with **Node.js**. Its a light-weight server built using Express framework and handles CRUD operations of the doclings. The major challenge here was to integrate both MongoDB and Amazon AWS S3 for document storage. More on that is later discussed below. It receives the file in the form of *multipart/formdata* and is stored in the buffer until the request is being processed. [Multer](https://www.npmjs.com/package/multer) helps you to hold the file until it is being sent to the AWS bucket.

But the most important thing which I learned during developing this API is to secure private keys and database URLs using environment variables. I spent a major time with the AWS Support Team due to the fact that I had blatantly pushed some private data on my repo :sweat_smile: which resulted in imposing restrictions on my S3 bucket to prevent possible data compromise. So folks, always use **.env** file and definitely add that to the .gitignore. Again the [dotenv](https://www.npmjs.com/package/dotenv) NPM package is a great tool to deal with that.



### Database

The popular NoSQL **MongoDB** is being used hosted on Mongo Atlas. The metadata of the doclings is being stored on the database while the actual file is uploaded on AWS. Initially I thought of using [GridFS](https://docs.mongodb.com/manual/core/gridfs/) for storing the files, but after some reading and research, I found out that it is best to use database as database, specifically for storing properties whereas the actual file storage can be delegated to a more storage-centric service. [Mongoose](https://mongoosejs.com/) helped me design a consistent schema for the doclings.



### Storage

**AWS S3** free-tier buckets provide the storage solution for the files. The API connects with the AWS service using the [aws-sdk](https://www.npmjs.com/package/aws-sdk) package and saves the file link as a key in the mongoDB database. One thing to note here is that in order to make the file URLs publicly accessible in the browser, I had to turn off `Block public and cross-account access if bucket has public policies` from the *Permissions* menu of the bucket.



### Front-end

This project is built with **React** and bootstrapped by [Create React App](https://github.com/facebook/create-react-app). I have used class based components but transitioning to React Hooks is on my to-do list.

#### State Management

For global state management, **Redux** is being used along with **redux-thunk** to deal with asynchronous action creators while **axios** handles REST API calls. For monitoring and debugging the state, [Redux Dev Tools](https://github.com/zalmoxisus/redux-devtools-extension) works great.

#### Responsive Styling

Using **Bootstrap 4** grid system and spacing utilities to make the application look good on any device. I had to use [react-bootstrap](https://react-bootstrap.github.io/) for displaying the Modals as the default classes were not working properly even with [React-Portals](https://reactjs.org/docs/portals.html).

#### Displaying the pdf

This is one of the most difficult thing to do and consumed most of my time. Displaying an embedded pdf is memory intensive and can make the system unresponsive if rendered using the main thread. I tried and tested huge number of libraries including [react-pdf](https://www.npmjs.com/package/react-pdf), [PDF.js](https://mozilla.github.io/pdf.js/), [react-read-pdf](https://www.npmjs.com/package/react-read-pdf) and whatnot. Some were not working on mobile devices, some were forever stuck on *loading...* whereas some were not working at all :sob:. Finally I found my answer in a [Stack Overflow answer](https://stackoverflow.com/a/38172763) who suggested using the `<iframe>` tag with a slightly modified `src` attribute.

```jsx
<iframe src=`https://docs.google.com/gview?url=${fileLink}&embedded=true` />
```

:pencil2: ​Notice how the src attribute is prefixed with Google Docs Viewer. 

This worked like a charm ! :tada:

Kudos to the developer for finding this solution without any library or dependency. :pray:



### Authentication

Client side **Google OAuth 2.0** with the help of gapi provided by Google. I am also maintaining the user login state in the redux store.



### Deployment

Deployed on **heroku** using the [mars/create-react-app](https://github.com/mars/create-react-app-buildpack) buildpack. It automatically deploys the production build and installs necessary dependencies for optimum performance and security.



## To-Dos

- [x] Add file drag 'n' drop support
- [ ] Use Sagas instead of Redux-thunk
- [ ] Convert class based components into Hooks
- [ ] Add bookmark, share and comment features



## Miscellaneous

As I already told [above](user-content-api) about the mistake of pushing the private AWS keys on Github, it was very difficult to clean this mess because even if I removed the keys and push a new commit, the old commits would still be showing the keys due to git's tracking history. A program called [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) (basically a .jar file) really helped me in this case. You can read the instructions on its website. I am just mentioning it here so that if anybody gets stuck in a similar situation like this, he/she can easily refer to it.



Keep coding ! :v: