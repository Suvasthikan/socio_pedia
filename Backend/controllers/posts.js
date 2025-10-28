// import Post from "../models/Post.js";
// import User from "../models/User.js";

// // CREAT

// export const createPost = async (req, res) => {
//     try {
//         const { userId, description, picturePath } = req.body;
//         console.log(req.body);

//         const user = await User.findById(userId);

//         const newPost = new Post({
//             userId,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             location: user.location,
//             description,
//             userPicturePath: user.picturePath,
//             picturePath,
//             likes: "",
//             comments: []

//         })
//         await newPost.save();

//         const post = await Post.find();
//         res.status(201).json(post);

//     } catch (err) {
//         res.status(409).json({ message: err.message })
//     }
// }

// // READ

// export const getFeedPosts = async (req, res) => {
//     try {
//         const post = await post.find();
//         res.status(200).json(post);
//     } catch (err) {
//         res.status(404).json({ message: err.message });
//     }
// }

// export const getUserPost = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const post = await post.find(userId);
//         res.status(200).json(post);
//     } catch (err) {
//         res.status(404).json({ message: err.message });
//     }
// }

// // UPDATE

// export const likePost = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { userId } = req.body;
//         const post = await post.findById(id);
//         const like = await post.like.get(userId);

//         if (isLiked) {
//             post.like.delete(userId);
//         } else {
//             post.like.set(userId, true);
//         }

//         const updatePost = await post.findByIdAndUpdate(
//             id,
//             { like: post.like },
//             { new: true },
//         );
//         res.status(200).json(updatePost)
//         res.status(200).json(post);
//     } catch (err) {
//         res.status(404).json({ message: err.message });
//     }
// }


import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE POST
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: new Map(), // FIX: was `""`, should be a Map or empty object
      comments: [],
    });

    await newPost.save();

    const posts = await Post.find(); // FIX: variable name changed from `post` to `posts`
    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// GET ALL POSTS (Feed)
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // FIX: `post.find()` was wrong, should be `Post.find()`
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// GET USER POSTS
export const getUserPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId }); // FIX: was `post.find(userId)` — wrong usage
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// LIKE OR UNLIKE A POST
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id); // FIX: Capital `Post`, not `post`
    if (!post) return res.status(404).json({ message: "Post not found" });

    const isLiked = post.likes.get(userId); // FIX: renamed `like` → `likes` for consistency

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
