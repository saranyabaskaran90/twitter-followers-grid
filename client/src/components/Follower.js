import React from 'react';
export default function Follower(props) {
  let imageUrl = props.followerDetails.profile_image_url.replace(/_normal/g,'');// since the profile image is in thumbnail resolution
  return (
    // <img
    //       className="profile-image"
    //       src={props.followerDetails.profile_image_url}
    //       alt={`${props.followerDetails.name} Twitter Profile`}
    //     />
    // <tr>
    //   <td>
    //     <img[[]\]
    //       className="profile-image"
    //       src={props.followerDetails.profile_image_url}
    //       alt={`${props.followerDetails.name} Twitter Profile`}
    //     />
    //   </td>
    //   <td>{props.followerDetails.name}</td>
    //   <td><a href={`https://twitter.com/${props.followerDetails.screen_name}`} target="_blank" rel="noopener noreferrer">
    //     @{props.followerDetails.screen_name}
    //   </a></td>
    //   <td>{props.followerDetails.friends_count}</td>
    //   <td>{props.followerDetails.followers_count}</td>
    // </tr>
    <div className="col-3">
    <div className="card m-2">
      <div className="card-img-cntr">
  <img className="card-img-top img-fluid" src={imageUrl} alt={`${props.followerDetails.name} Twitter Profile`}/></div>
  <div className="card-body">
    <h5 className="card-title">{props.followerDetails.name}</h5>
    <p className="card-text">{props.followerDetails.screen_name}</p>
  </div>
  </div></div>
  );
}
