// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebase from "firebase/app";
const data = [
  {
    id: 2,
    title: "The Bottom Billion",
    Author: "Paul Collier",
    genre: "Business",
    publications: "Oxford University Press",
    price: "969",
    description:
      "The Bottom Billion: Why the Poorest Countries are Failing and What Can Be Done About It is a 2007 book by Paul Collier, Professor of Economics at Oxford University, exploring the reasons why impoverished countries fail to progress despite international aid and support. In the book Collier argues that there are many countries whose residents have experienced little, if any, income growth over the 1980s and 1990s. On his reckoning, there are just under 60 such economies, home to almost 1 billion people.",
  },
  {
    id: 3,
    title: "श्यामची आई",
    Author: "Sane Guruji",
    genre: "Autobiography",
    publications: "Varada Prakashan Pvt. Ltd.",
    price: "100",
    description:
      "श्यामची आई हे पुस्तक सुंदर आणि सुरस असून, त्यात साने गुरूजींनी हृदयातील सारा जिव्हाळा ओतलेला आहे. मातेबद्दल असणाऱ्या प्रेम, भक्ति व कृतज्ञता अशा अपार भावना 'श्यामची आई' या पुस्तकात साने गुरुजींनी मांडलेल्या आहेत. हे पुस्तक वाचून वाचकांचे डोळे व हृदय भरून येईल. हे पुस्तक ही एक सत्यकथा आहे. नाशिक तुरूंगात साने गुरूजींनी या कथा लिहिण्यास ९ फेब्रुवारी १९३३ (गुरुवार) रोजी सुरुवात केली आणि १३ फेब्रुवारी १९३३ (सोमवार) पहाटे त्या लिहून संपविल्या. मातेचा महिमा हे या पुस्तकातील मध्यवर्ती सूत्र आहे. त्याबरोबरच सुसंस्कृत व बाळबोध घराण्यातील साध्या, सरळ व रम्य संस्कृतीचे चित्रही यात आले आहे.",
  },
  {
    id: 4,
    title: "पावनखिंड",
    Author: "रणजित देसाई",
    genre: "Historical",
    publications: "Mehta Publishing House",
    price: "143",

    description:
      "पावनखिंड ही रणजित देसाई यांची शेवटची ऐतिहासिक कादंबरी. 1960 नंतरच्या ऐतिहासिक कादंबरीच्या परंपरेतील वेगळ्या प्रकारची कादंबरी लिहिण्याचा हेतू मनात धरून देसाईंनी ही कादंबरी लिहिली. बाजीप्रभू देशपांडेंनी प्राण पणाला लावून घोडखिंड लढवली आणि राजांचे प्राण वाचले. बाजीने स्वराज्यासाठी आपल्या निष्ठा आणि पराक्रमाच्या सहाय्याने खिंडीची पावनखिंड बनवली. बाजीच्या देदिप्यमान देशभक्तीचे, अतुलनीय शौर्याचे, वीरश्रीपूर्ण चित्रण या कादंबरीत आढळते. या कादंबरीतील स्थळांचे, गडांच्या परिसरातील धामधुमीचे, लढायांचे, जय-पराजयाच्या निमित्ताने वाक्‌प्रचार, म्हणी, स्वगत आणि सूचक व नाट्यपूर्ण अर्थाने भरलेले संवाद हे या पुस्तकाचे विशेष जाणवणारे वैशिष्ट्य.पहावयास मिळणार्‍या आशा-निराशांचे चित्रण योग्य वातावरणनिर्मिती करते. या पार्श्वभूमीवर बाजीप्रभूंच्या वीरमरणाचे करुणरसपूर्ण वर्णन कादंबरीची रसक्ता आणि भावपूर्णता वाढवत नेते. शिवशाहीतील पराक्रमी पुरूषावर लिहिली गेलेली मराठीतील ही पहिली कादंबरी.",
  },
  {
    id: 5,
    title: "YAYATI",
    Author: "V S Khandekar",
    genre: "Mythology-fiction",
    publications: "Mehta Publishing House",
    price: "274",
    description:
      "Yayati is a 1959 Marathi-language mythological novel by Indian writer V. S. Khandekar. One of Khandekar's best-known works, it retells the story of the mythical Hindu king, Yayati, from the Hindu epic the Mahabharata. The novel has multiple narrators, and poses several questions on the nature of morality. Scholars have analysed its hero, Yayati, as a represention of modern man. Accepted as classic of Marathi literature, Yayati has won several awards, including the Sahitya Akademi Award in 1960 and the Jnanapith Award in 1974.",
  },
  {
    id: 6,
    title: "Unaccustomed Earth",
    Author: "Jhumpa Lahiri",
    genre: "Novel",
    publications: "Penguine Random House LLC",
    price: "288",
    description:
      "Unaccustomed Earth is a collection of short stories from American author Jhumpa Lahiri. It is her second collection of stories, following Interpreter of Maladies (which won the Pulitzer Prize for Fiction). As with much of Lahiri's work, Unaccustomed Earth considers the lives of Indian American characters and how they deal with their mixed cultural environment.[1][2] The book was Lahiri's first #1 on the New York Times Best-sellers list, where it debuted at the top spot.",
  },
  {
    id: 7,
    title: "The Notebook",
    Author: "Nicholas Spark",
    genre: "Romantic",
    publications: "Grand Central Publishing",
    price: "315",
    description:
      "The Notebook is a 2004 American romantic drama film directed by Nick Cassavetes, written by Jeremy Leven and Jan Sardi, based on the 1996 novel of the same name by Nicholas Sparks. The film stars Ryan Gosling and Rachel McAdams as a young couple who fall in love in the 1940s. Their story is read from a notebook in the present day by an elderly man (played by James Garner), telling the tale to a fellow nursing home resident (played by Gena Rowlands, who is the director Cassavetes's mother). The Notebook received generally mixed reviews, but performed well at the box office and received a number of award nominations, winning eight Teen Choice Awards, a Satellite Award, and an MTV Movie Award. The film became a sleeper hit and has gained a cult following.[5][6] On November 11, 2012, ABC Family premiered an extended version with deleted scenes added back into the original storyline.",
  },
  {
    id: 8,
    title: "The Secret",
    Author: "Rhonda Byrne",
    genre: "Self-Help",
    publications: "Beyond Word Publishing, Atria Publishing Group",
    price: "393",
    description:
      "The Secret is a 2006 self-help book by Rhonda Byrne, based on the earlier film of the same name. It is based on the belief of the law of attraction, which claims that thoughts can change a person's life directly.[1][2] The book alleges Energy (esotericism) as assurance of its effectiveness. The book has sold 30 million copies worldwide and has been translated into 50 languages.",
  },
  {
    id: 9,
    title: "Data Communications and Networking",
    Author: "Behrouz A.Forouzan",
    genre: "Technical",
    publications: "McGraw Hill Education",
    price: "595",
    description:
      "Data communications refers to the transmission of this digital data between two or more computers and a computer network or data network is a telecommunications network that allows computers to exchange data. The physical connection between networked computing devices is established using either cable media or wireless media. The best-known computer network is the Internet. This tutorial should teach you basics of Data Communication and Computer Network (DCN) and will also take you through various advance concepts related to Data Communication and Computer Network.",
  },
  {
    id: 10,
    title: "Sharp Objects",
    Author: "Gillian Flynn",
    genre: "Thriller",
    publications: "Shaye Areheart Books",
    price: "384",
    description:
      "Sharp Objects is the 2006 debut novel by American author Gillian Flynn. The book was first published through Shaye Areheart Books on September 26, 2006, and has subsequently been re-printed through Broadway Books. The novel follows Camille Preaker, a newspaper journalist who must return to her hometown to report on a series of brutal murders.",
  },
  {
    id: 1,
    title: "Dongri to Dubai: Six Decades of the Mumbai",
    Author: "S Hussain Zaidi",
    genre: "Criminal",
    publications: "Lotus Publications",
    price: "395",
    description:
      "Dongri to Dubai: Six Decades of the Mumbai Mafia is a book by former investigative journalist Hussain Zaidi. The book traces the evolution of the Mumbai mafia from a group of thugs and smugglers to the present day mafia dons of organised crime. It traces the journey of Dawood Ibrahim from the by-lanes of Dongri where he first cut his teeth in crime, to Dubai, where he eventually established his empire.[2] The book was adapted into the film Shootout at Wadala by Sanjay Gupta.",
  },
];

const getData = async () => {
  const data = await firebase.database().ref().child("Books").get();
  return data;
};

export default (req, res) => {
  // const data = getData();
  res.status(200).json(data);
};
