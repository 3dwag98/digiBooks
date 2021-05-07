
<!-- PROJECT LOGO -->
<br />
<p align="center">
    <img src="public/logo.gif" alt="Logo" width="160" height="160" >
  <h1 align="center">Digi-Books</h1>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#database-architecture">Database Architecture</a></li>        
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#learn-more">Learn More</a></li>
        <li><a href="#deploy-on-vercel">Deploy on Vercel</a></li>
        <li><a href="#run-the-application">Run the Application</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img src="/screenshots/home2.jpeg" alt="digi-books">

### Greetings all!

>We offer huge collection of e-books in diverse category of Fiction, Non-fiction, Biographies, History, Religions, Self -Help, Children. We also sell in vast collection of Investments and Management, Computers, Engineering, Medical, College and School text references books proposed by different institutes as syllabus across the country. We attempt to extend the customer satisfaction by catering easy user-friendly UI and payment options. Upside to all of this, we are disposed to provide e-books on digital platform in the form of pdf, epub to all the bibilophile. As well, we humbly invite all the sellers around the country to partner with us. We will surely provide you the platform for many sparkling genre and grow the <b>Digi-Books</b> family. We would like to thank you for shopping with us. You can write us for any new thoughts at <b>digi-books@support.com</b> helping us to improvise for the reader satisfaction.

#### Thank You


### Built With

We have built this application with minimilistic tools and maximum logic which helped us to focus on the best user-friendly UI and real time functionality. Below is the list with major frameworks that we built our project using.
* [Node JS](https://nodejs.org/en/)
* [React](https://reactjs.org/)
* [NextJS](https://nextjs.org/)
* [Firebase](https://firebase.google.com/)
* [Chakra UI](https://chakra-ui.com/)

### Database Architecture

This Application is built with using [Firebase Realtime Database](https://firebase.google.com/docs/database) for storing user data and [Firebase Storage](https://firebase.google.com/docs/storage) for storing books related data.

#### Book Database schema

```json
"Books" : {
    "_1o6sna1f4" : {
      "Author" : "Sane Guruji",
      "description" : "श्यामची आई हे पुस्तक सुंदर आणि सुरस असून, त्यात साने गुरूजींनी हृदयातील सारा जिव्हाळा ओतलेला आहे. मातेबद्दल असणाऱ्या प्रेम, भक्ति व कृतज्ञता अशा अपार भावना 'श्यामची आई' या पुस्तकात साने गुरुजींनी मांडलेल्या आहेत. हे पुस्तक वाचून वाचकांचे डोळे व हृदय भरून येईल. हे पुस्तक ही एक सत्यकथा आहे. नाशिक तुरूंगात साने गुरूजींनी या कथा लिहिण्यास ९ फेब्रुवारी १९३३ (गुरुवार) रोजी सुरुवात केली आणि १३ फेब्रुवारी १९३३ (सोमवार) पहाटे त्या लिहून संपविल्या. मातेचा महिमा हे या पुस्तकातील मध्यवर्ती सूत्र आहे. त्याबरोबरच सुसंस्कृत व बाळबोध घराण्यातील साध्या, सरळ व रम्य संस्कृतीचे चित्रही यात आले आहे.\n",
      "genre" : "Autobiography",
      "id" : "_1o6sna1f4",
      "imgUrl" : "https://firebasestorage.googleapis.com/v0/b/react-book-93a56.appspot.com/o/cover%2Fshyamchi_aai.png?alt=media&token=456e5ff5-68d6-4f4e-8ffe-cb438d11822e",
      "pdfUrl" : "https://firebasestorage.googleapis.com/v0/b/react-book-93a56.appspot.com/o/pdf%2F%E0%A4%B6%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AE%E0%A4%9A%E0%A5%80_%E0%A4%86%E0%A4%88.pdf?alt=media&token=8f2a4c44-7654-4836-9f36-2f15c216bf2b",
      "price" : "100",
      "publications" : "Varada Prakashan Pvt. Ltd.",
      "title" : "श्यामची आई"
    },
    "_31o5gaejk" : {
      "Author" : "Jhumpa Lahiri",
      "description" : "Unaccustomed Earth is a collection of short stories from American author Jhumpa Lahiri. It is her second collection of stories, following Interpreter of Maladies (which won the Pulitzer Prize for Fiction). As with much of Lahiri's work, Unaccustomed Earth considers the lives of Indian American characters and how they deal with their mixed cultural environment. The book was Lahiri's first #1 on the New York Times Best-sellers list, where it debuted at the top spot.\n",
      "genre" : "Novel",
      "id" : "_31o5gaejk",
      "imgUrl" : "https://firebasestorage.googleapis.com/v0/b/react-book-93a56.appspot.com/o/cover%2Funaccustomed_earth.png?alt=media&token=35bac0b0-2edd-4a31-8528-0476ebbab2a8",
      "pdfUrl" : "https://firebasestorage.googleapis.com/v0/b/react-book-93a56.appspot.com/o/pdf%2FUnaccustomed_Earth.pdf?alt=media&token=a6457eb4-061f-4d20-b327-db53d2813e1a",
      "price" : "288",
      "publications" : "Penguine Random House LLC",
      "title" : "Unaccustomed Earth"
    }}
```

#### Users Database schema
```json
"Users" : {
    "01KgxzqdVSSnIyE5rqme4wz7FoH2" : {
      "address" : "Chembur, Mumbai, 421234",
      "contact" : "8452879685",
      "email" : "chintgavade@ideal.com",
      "fName" : "Chintamani",
      "id" : "01KgxzqdVSSnIyE5rqme4wz7FoH2",
      "lName" : "Gavade",
      "type" : "seller",
      "username" : "Ideal Books"
    },
    "9hQFqz2qaTOIhSAkHF7jUhGbcQD2" : {
      "address" : "Kalyan, Thane, Maharashtra",
      "contact" : "8258588397",
      "email" : "kirankapdi@hotmail.com",
      "fName" : "kiran",
      "id" : "9hQFqz2qaTOIhSAkHF7jUhGbcQD2",
      "lName" : "kapadi",
      "type" : "user",
      "username" : "kirankapdi"
    }
  }
```

## Getting Started

### Prerequisites

Install Node.JS installer- via [Node Site](https://nodejs.org/en/). Select relevant installer as per your OS and download the latest default version. Run the below command to get the latest version of NPM if you already have Node.JS installed.
* npm
  ```sh
  npm install npm@latest -g
  ```
  
### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



### Installation

1. Clone or Downlaod the repo using this [Github repo](https://github.com/3dwag98/digiBooks.git)
2. Once the xip downloaded, extract the zip folder and open the command prompt and go to unzipped folder.
3. Install NPM packages
   ```sh
   npm install
   ```
4. Install Firebase and Firebase NPM packages.
   ```bash
   npm install firebase
   npm install firebase-admin
   ```

### Run the Application

To run the application, execute the following command in command prompt.
```bash
npm run dev
```

Use the following [localhost](http://localhost:3000) to view the application

<!-- USAGE EXAMPLES -->
## Usage

The Digi-Books application will help users and stakeholders to set-up and digitalize the business model and upscale it. This application focuses on mainly features of types of 2 account- 
1) Buyer- Bookholics can be use this digital platform to utilize the e-book facility, they can pay and download e-book and give rating/review the books.			
2) Sellers- Sellers who want to grow and upscale the business via digital platform can upload the books, books can be of format pdf and epub. Seller can earn revenue through this application. 

Below are the screenshots from the modules-
# ![homepage](/screenshots/home1.jpeg)
<img src="/screenshots/about us.png" alt="about us">
<img src="/screenshots/books.png" alt="books">


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch 
3. Commit your Changes 
4. Push to the Branch 
5. Open a Pull Request

## Contact
Chintamani Gavade - [@ChintamaniGavade](https://twitter.com/ChintamaniGawde) - gawdechintamani@gmail.com

Kiran Kapadi - kirankapdi1998@gmail.com

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Typewriter](https://www.npmjs.com/package/typewriter-effect)
* [React Icons](https://react-icons.github.io/react-icons/)
* [Chakra UI](https://chakra-ui.com/)
* [Font Awesome](https://fontawesome.com)
