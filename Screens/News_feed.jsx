import React, {useEffect, useState} from 'react';
import {News_card} from '../component/News_card';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Loading} from '../component/Loading';
import database from '@react-native-firebase/database';
import {AppBar} from '../component/AppBar';
import {profile_action} from '../store/slices/auth_slice';
import {useNavigation} from '@react-navigation/native';
export const News_feed = () => {
  const {uid} = useSelector(store => store.auth);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    fetchAllUsersAndPostsRealtime();
  }, []);

  const fetchAllUsersAndPostsRealtime = () => {
    // console.log('Setting up real-time listener for users...');

    // Reference to the Users node in Realtime Database
    const usersRef = database().ref('users');

    // Listen for changes in the Users node
    usersRef.on(
      'value',
      snapshot => {
        const allPosts = [];
        snapshot.forEach(userSnapshot => {
          const userId = userSnapshot.key;
          const userData = userSnapshot.val();

          // console.log('userData.profile', userData.profile);
          let {username, avatar_url, email} = userData.profile;

          if (userId == uid) {
            dispatch(profile_action(userData.profile));
            username = 'You';
          }
          // Reference to the Posts node for each user
          const postsRef = usersRef.child(userId).child('posts');
          // console.log('postsRef', postsRef);

          // Fetch posts for each user
          postsRef.on('value', postsSnapshot => {
            postsSnapshot.forEach(postSnapshot => {
              allPosts.push({
                postId: postSnapshot.key,
                username,
                avatar_url,
                email,
                ...postSnapshot.val(),
              });
            });

            // Remove duplicates and update the news state
            setNews(removeDuplicates(allPosts));
          });
        });
      },
      error => {
        console.error(
          'Error fetching users and posts in real-time: ',
          error.message,
        );
      },
    );
  };

  const removeDuplicates = array => {
    const uniqueObjects = [];
    const uniqueKeys = new Set();

    array.forEach(item => {
      const key = `${item.title}-${item.description}-${item.image}`;
      if (!uniqueKeys.has(key)) {
        uniqueKeys.add(key);
        uniqueObjects.push(item);
      }
    });
    setLoading(false);
    return uniqueObjects;
  };
  return (
    <>
      <AppBar />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView style={{padding: 10}}>
          <View style={{gap: 20}}>
            {news.map(newsData => {
              const {
                title,
                description,
                url,
                id,
                username,
                avatar_url,
                date_time,
                email,
              } = newsData;
              return (
                <News_card
                  title={title}
                  description={description}
                  email={email}
                  image_uri={url}
                  key={id}
                  username={username}
                  avatar_url={avatar_url}
                  date_time={date_time}
                  readMoreHandle={() =>
                    navigation.navigate('News_feed_details', newsData)
                  }
                />
              );
            })}
          </View>
        </ScrollView>
      )}
    </>
  );
};
