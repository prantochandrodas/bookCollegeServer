const express = require('express')
const cors = require('cors')
// var jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config();
const port = 5000
app.use(express.json())
app.use(cors());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pbafkul.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
// Create a new ObjectID
//   function verifyJwt(req, res, next) {
//     const authHeader = (req.headers.authorization);
//     if (!authHeader) {
//       return res.status(401).send({ message: 'unauthorized access' })
//     }
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
//       if (err) {
//         res.status(401).send({ message: 'unauthorized access' })
//       }
//       req.decoded = decoded;
//       next();
//     })
//   }

async function run() {
  try {

    const postCollection = client.db('bookCollege').collection('userCollection');
    const userCollection = client.db('bookCollege').collection('userCollection');
    const collegeCollection = client.db('bookCollege').collection('collegesCollection');
    const addmitionCollection = client.db('bookCollege').collection('addmitionCollection');



    // //jwt
    //   app.post('/jwt', (req, res) => {
    //     const user = req.body;
    //     console.log(user);
    //     const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
    //     res.send({ token })
    //   })

    app.get('/findCollege', async (req, res) => {
      const name = req.query.name;
      console.log(name);
      const query = { collegeName: name };
      const result = await collegeCollection.findOne(query);
      res.send(result);
      console.log(result);
    })

    // find college by email 
    app.get('/findAddmitionId/:email', async (req, res) => {
      const email = req.params.email;
      // console.log(email)
      const query = { userEmail: email };
      const findMyAddmition = await addmitionCollection.findOne(query);
      res.send(findMyAddmition);
    })
    app.get('/user', async (req, res) => {
      const query = {};
      const result = await userCollection.find(query).toArray();
      res.send(result);
    })

    app.get(`/user/:email`, async (req, res) => {
      const email = req.params.email;
      const query = { email: email }
      const result = await userCollection.findOne(query);
      res.send(result);
    })
    //get collegeDetails
    app.get('/collegeDetails/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await collegeCollection.findOne(query);
      res.send(result);
    })

    app.get('/add', async (req, res) => {
      const filter = {};
      const option = { upsert: true }
      const updatedDoc = {
        $set: {
          // eventsDetails: [

          //   {
          //     name: "Cultural Events",
          //     eventimage: "https://cosmosgroup.sgp1.digitaloceanspaces.com/news/StH5DrJqfacEigqEK27znEg5CMBPixAR60VotX7G.jpeg",
          //     details: "College cultural events are lively and diverse gatherings where students showcase their talents, creativity, and cultural heritage through various performances, competitions, and exhibitions. These events often include music, dance, drama, art displays, fashion shows, talent contests, and other entertaining activities that celebrate the diversity and vibrancy of different cultures. They provide a platform for students to express themselves, learn from one another, and foster a sense of community and belonging within the college campus."
          //   },
          //   {
          //     name: "Sports Events",
          //     eventimage: "https://www.aiub.edu/Files/Uploads/Original/gellary_fba_events_5b.jpg",
          //     details: "College sports events are competitive games or matches involving various sports like football, basketball, baseball, soccer, and more, played between teams representing different colleges or universities. These events bring together student-athletes to compete in tournaments, championships, and regular-season games, showcasing their skills and teamwork while fostering school spirit and community support. Fans, students, and alumni often come together to cheer for their teams, creating a lively and energetic atmosphere on campus."
          //   },
          //   {
          //     name: "Academic Events",
          //     eventimage: "https://www.easternuni.edu.bd/assets/slider/Pc/all_guest_view_7th_convocation.webp",
          //     details: "College academic events are gatherings or activities organized within educational institutions to enhance learning, promote knowledge, and encourage intellectual engagement among students and faculty. These events can include seminars, workshops, conferences, debates, symposiums, and competitions focused on various academic disciplines such as science, arts, business, technology, and more. They aim to foster a deeper understanding of subjects, facilitate networking opportunities, and encourage the exchange of ideas among participants."
          //   },
          //   {
          //     name: "Entertainment Events",
          //     eventimage: "https://www.tbsnews.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2023/03/09/joy_bangla_photo_noor_22.jpg",
          //     details: "College entertainment events are fun activities organized by educational institutions for students. These events include concerts, movie nights, talent shows, game nights, comedy shows, dances, and other recreational activities that aim to provide enjoyment, relaxation, and opportunities for socializing among students. They serve as a break from academic studies and create a lively and engaging atmosphere on campus."
          //   }
          // ]
          // reviewDetails: [

          //   {
          //     name: "Cultural Events",
          //     profileLogoimage: "https://www.eduopinions.com/wp-content/themes/eduopinions/assets/img/deafult-avatar.png",
          //     details: "Dhaka University is known for its enrich history and educational achievement. During our course period, we enjoyed our time with super-intelligent teachers and mentors who guided us not only to be successful in our profession but also taught us to be good humans. We enjoyed the festive mode of the campus without occasion. Everyone should take the opportunity to walk in the campus and be part of its community"
          //   },
          //   {
          //     name: "Ariyan",
          //     profileLogoimage: "https://www.eduopinions.com/wp-content/themes/eduopinions/assets/img/deafult-avatar.png",
          //     details: "Dhaka university quality of education and faculty and student academic qualification is very good and external aspect is also good I like it very much and completed my student life here and did 75 from here teaching qualification and student education quality is very good "
          //   },
          //   {
          //     name: "Shohidul",
          //     profileLogoimage: "https://www.eduopinions.com/wp-content/themes/eduopinions/assets/img/deafult-avatar.png",
          //     details: "This is one of the greatest University of Bangladesh. Dhaka University including all best subject have for studying Bangladeshi Boys & Girl. And also foreign People’s have chance to study at this amazing University. I am recommend everyone try to visit this good place. I think everyone will be amazed by this. Thanks"
          //   }
          // ]
        }
      }
      const result = await collegeCollection.updateMany(filter, updatedDoc, option);
      res.send(result);
    });
    app.get('/colleges', async (req, res) => {
      const query = {};
      const result = await collegeCollection.find(query).toArray();
      res.send(result);
    })

    app.get('/allProduct', async (req, res) => {
      const page = req.query.page;
      const size = parseInt(req.query.size);
      const query = {};
      const result = await collegeCollection.find(query).skip(page * size).limit(size).toArray();
      const count = await collegeCollection.estimatedDocumentCount();
      res.send({ count, result });
    })

    app.get('/post', async (req, res) => {
      const query = {};
      const result = await postCollection.find(query).sort({ date: -1 }).collation({ locale: "en_US", numericOrdering: true }).toArray();
      res.send(result);
    })

    app.get('/newsedpost', async (req, res) => {
      const query = {};
      const result = await postCollection.find(query).sort({ date: -1 }).collation({ locale: "en_US", numericOrdering: true }).toArray();
      res.send(result);
    })



    //get my post
    app.get('/myProfile/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await postCollection.find(query).toArray();
      const result2 = await userCollection.findOne(query);
      res.send([result, result2]);
    })



    //get my post
    app.get('/userProfile', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result2 = await userCollection.findOne(query);
      res.send(result2);
    })

    //get my post
    app.get('/myProfile/post/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await postCollection.findOne(query);
      res.send(result);
    })

    //find user 
    app.get('/serch', async (req, res) => {
      const text = req.query.text;
      const result = await collegeCollection.find({
        $or: [
          { collegeName: { $regex: text, $options: 'i' } }
        ]
      }).toArray();
      res.send(result);
    })



    app.get('/getAllUser', async (req, res) => {
      const query = {};
      const result = await userCollection.find(query).toArray();
      res.send(result);
    })

    app.get('/getUser', async (req, res) => {
      const query = { email: req.query.email };
      const result = await userCollection.findOne(query);
      res.send(result);
    })
    // add signuped user
    app.post('/addUser', async (req, res) => {
      const post = req.body;
      const email = req.body.email;
      const name = req.body.name;
      const university = req.body.university;
      const address = req.body.address;

      const query = { $or: [{ email: email }, { name: name }] }
      const findUser = await userCollection.findOne(query);
      if (findUser) {
        res.send(false);
      } else {
        const result = await userCollection.insertOne(post);
        res.send(result);
      }

    });


    // add addmition

    app.post('/addmition', async (req, res) => {

      const post = req.body;
      const college = req.body.college;
      console.log(college)
      const userEmail = req.body.userEmail;
      const query = { email: userEmail }
      const option = { upsert: true }
      const updatedDoc = {
        $set: {
          university: college,
        }
      }


      const query2 = { userEmail: userEmail }
      const findUser = await addmitionCollection.findOne(query2);
      if (findUser) {
        res.send(false);
      } else {
        const result = await userCollection.updateOne(query, updatedDoc, option);
        const result2 = await addmitionCollection.insertOne(post)
        res.send([result2, result]);
      }

    });


    // add signuped user
    app.put('/addGoogleUser', async (req, res) => {
      const post = req.body;
      const email = req.body.email;
      const name = req.body.name;
      const photo = req.body.photo;
      const university = req.body.university;
      const address = req.body.address;
      const query = { email: post.email }
      const option = { upsert: true }
      const updatedDoc = {
        $set: {
          name: name,
          email: email,
          photo: photo,
          university: university,
          address: address
        }
      }
      const result = await userCollection.updateOne(query, updatedDoc, option);
      res.send(result);

    });

    // add review

    app.put('/addReview', async (req, res) => {
      const body = req.body;

      const name = req.body.name;
      const profileLogoimage = req.body.profileLogoimage;
      const details = req.body.details;

      const review = {
        name,
        profileLogoimage,
        details
      }
      const id = req.body.findId;
      const filter = {
        _id: new ObjectId(id)
      }
      const option = { upsert: true }
      const updatedDoc = {
        $push: {  reviewDetails:review }
      }
      const result = await collegeCollection.updateOne(filter, updatedDoc, option);
      res.send(result);
    })

  } finally {

  }
}
run().catch(console.log);






app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})