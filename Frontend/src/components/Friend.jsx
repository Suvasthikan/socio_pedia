import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { setFriends } from "../state";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme(); // <-- Move this up here

  // Avoid rendering if user or friends are not ready
  if (!user || !user._id) return null;

  const _id = user._id;
  const friends = user.friends || [];
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // Check if this friend is already in the user's friends list
  const isFriend = friends?.some((friend) => {
    if (!friend) return false;
    if (typeof friend === "string") return friend === friendId;
    if (typeof friend === "object" && friend._id) return friend._id === friendId;
    return false;
  });

  const patchFriend = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${_id}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error("Failed to patch friend:", error);
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      <IconButton
        onClick={patchFriend}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;











// import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
// import { Box, IconButton, Typography, useTheme } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import UserImage from "./UserImage";
// import { useNavigate } from "react-router-dom";
// import FlexBetween from "./FlexBetween";
// import { setFriends } from "../state";

// const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user);
//   const token = useSelector((state) => state.token);

//   if (!user || !user._id) return null;

//   const _id = user?._id;
//   const friends = useSelector((state) => state.user?.friends || []);
//   const { palette } = useTheme();
//   const primaryLight = palette.primary.light;
//   const primaryDark = palette.primary.dark;
//   const main = palette.neutral.main;
//   const medium = palette.neutral.medium;

//   // Check if this friend is already in the user's friends list
//   const isFriend = friends?.some((friend) =>
//     typeof friend === "string"
//       ? friend === friendId
//       : friend._id === friendId
//   );
//   const patchFriend = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/users/${_id}/${friendId}`,
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const data = await response.json();
//       dispatch(setFriends({ friends: data }));
//     } catch (error) {
//       console.error("Failed to patch friend:", error);
//     }
//   };

//   // Avoid rendering if user data is not ready
//   if (!user || !_id) return null;

//   return (
//     <FlexBetween>
//       <FlexBetween gap="1rem">
//         <UserImage image={userPicturePath} size="55px" />
//         <Box
//           onClick={() => {
//             navigate(`/profile/${friendId}`);
//             navigate(0);
//           }}
//         >
//           <Typography
//             color={main}
//             variant="h5"
//             fontWeight="500"
//             sx={{
//               "&:hover": {
//                 color: palette.primary.light,
//                 cursor: "pointer",
//               },
//             }}
//           >
//             {name}
//           </Typography>
//           <Typography color={medium} fontSize="0.75rem">
//             {subtitle}
//           </Typography>
//         </Box>
//       </FlexBetween>

//       <IconButton
//         onClick={patchFriend}
//         sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
//       >
//         {isFriend ? (
//           <PersonRemoveOutlined sx={{ color: primaryDark }} />
//         ) : (
//           <PersonAddOutlined sx={{ color: primaryDark }} />
//         )}
//       </IconButton>
//     </FlexBetween>
//   );
// };

// export default Friend;
















// // import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
// // import { Box, IconButton, Typography, useTheme } from "@mui/material";
// // import { useDispatch, useSelector } from "react-redux";
// // import UserImage from "./UserImage";
// // import { useNavigate } from "react-router-dom";
// // import FlexBetween from "./FlexBetween";
// // import { setFriends } from "../state";
// // const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
// //     const dispatch = useDispatch();
// //     const navigate = useNavigate();
// //     const { _id } = useSelector((state) => state.user);
// //     const token = useSelector((state) => state.token);
// //     const friends = useSelector((state) => state.user.friends);


// //     const { palette } = useTheme();
// //     const primaryLight = palette.primary.light;
// //     const primaryDark = palette.primary.dark;
// //     const main = palette.neutral.main;
// //     const medium = palette.neutral.medium;

// //     const isFriend = friends.find((friend) => friend._id === friendId);

// //     const patchFriend = async () => {
// //         const response = await fetch(
// //             `http://localhost:3001/users/${_id}/${friendId}`,
// //             {
// //                 method: "PATCH",
// //                 headers: {
// //                     Authorization: `Bearer ${token}`,
// //                     "content-type": "application/json",
// //                 },
// //             }
// //         );
// //         const data = await response.json();
// //         dispatch(setFriends({ friends: data }));
// //     };
// //     return (
// //         <FlexBetween>
// //             <FlexBetween gap="1rem">
// //                 <UserImage image={userPicturePath} size="55px" />
// //                 <Box
// //                     onClick={() => {
// //                         navigate(`/profile/${friendId}`);
// //                         navigate(0);
// //                     }}
// //                 >
// //                     <Typography
// //                         color={main}
// //                         variant="h5"
// //                         fontWeight="500"
// //                         sx={{
// //                             "&: hover": {
// //                                 color: palette.primary.light,
// //                                 cursor: "pointer"
// //                             }
// //                         }}
// //                     >
// //                         {name}
// //                     </Typography>
// //                     <Typography color={medium} fontSize="0.75rem">
// //                         {subtitle}
// //                     </Typography>
// //                 </Box>
// //             </FlexBetween>
// //             <IconButton
// //                 onClick={() => patchFriend()}
// //                 sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
// //             >
// //                 {isFriend ? (
// //                     <PersonRemoveOutlined sx={{ color: primaryDark }} />
// //                 ) : (
// //                     <PersonAddOutlined sx={{ color: primaryDark }} />
// //                 )}

// //             </IconButton>
// //         </FlexBetween>
// //     )
// // };
// // export default Friend;