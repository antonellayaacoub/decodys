import React, {useState, useEffect} from 'react';
import {
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text as NativeBaseText,
  ActionSheet,
  View,
} from 'native-base';
import {FlatList, ActivityIndicator, Alert, ScrollView} from 'react-native';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import ContentLoader, {
  Rect,
  Circle,
  BulletList,
  List as ListLoader,
} from 'react-content-loader/native';
import {
  GetMiniTestActions,
  DeleteMiniTestAction,
} from '../../../../store/actions/MiniTestsAction';
import Spinner from 'react-native-loading-spinner-overlay';
import {styles} from '../styles';
import DecodysButton from '../../../../Components/DecodysButton';

export default function ItemList() {
  const routeParams = useRoute();
  const {testId} = routeParams.params;
  const CANCEL_INDEX = 3;

  const [refreshBool, setrefreshBool] = useState(false);

  const getResponse = useSelector(
    state => state.miniTestReducer.getMiniTestState,
  );

  const [responseData, setResponseData] = useState([]);

  const [initPager, setinitPager] = useState('1');

  const [defaultURI, setDefaultURI] = useState('');

  const [totalItems, setTotalItems] = useState('');

  const [spinnerVisiblity, setSpinnerVisibility] = useState(false);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(GetMiniTestActions(initPager, testId));

    return () => {};
  }, []);

  useEffect(() => {
    if (getResponse != '' && getResponse !== 'loading') {
      if (
        getResponse.hasOwnProperty('data') &&
        getResponse.data.hasOwnProperty('data')
      ) {
        let currentPage = getResponse.data.current_page;
        let nextPage = currentPage + 1;
        setinitPager(nextPage);
        setDefaultURI(getResponse.file_directory);
        setResponseData(responseData => [...getResponse.data.data]);
        setrefreshBool(false);
        setTotalItems(getResponse.data.total);
      }
    }
    return () => {};
  }, [getResponse]);

  const fetchMore = () => {
    if (initPager == 1 || totalItems < 16) {
    } else {
      setrefreshBool(true);
      dispatch(GetMiniTestActions(initPager, testId));
    }
  };

  const handleRefresh = () => {
    setinitPager('1');
    setResponseData('');
    dispatch(GetMiniTestActions('1', testId));
  };

  const loadAnimation = () => {
    return (
      <View style={{width: '90%', marginLeft: '5%', marginRight: '5%'}}>
        <ContentLoader speed={1}>
          <Rect x="0" y=" 30" width="100%" height="100" />
          <Rect x="0" y="60" width="100%" height="100" />
          <Rect x="0" y="90" width="100%" height="100" />
          <Rect x="0" y="120" width="100%" height="100" />
          <Rect x="0" y="150" width="100%" height="100" />
          <Rect x="0" y="180" width="100%" height="100" />
          <Rect x="0" y="210" width="100%" height="100" />
          <Rect x="0" y="240" width="100%" height="100" />
          <Rect x="0" y="270" width="100%" height="100" />
          <Rect x="0" y="300" width="100%" height="100" />
          <Rect x="0" y="330" width="100%" height="100" />
          <Rect x="0" y="360" width="100%" height="100" />
          <Rect x="0" y="390" width="100%" height="100" />
          <Rect x="0" y="420" width="100%" height="100" />
          <Rect x="0" y="450" width="100%" height="100" />
          <Rect x="0" y="480" width="100%" height="100" />
          <Rect x="0" y="510" width="100%" height="100" />
        </ContentLoader>
      </View>
    );
  };

  const renderItem = (item, index) => {
    return (
      <List>
        <ListItem avatar>
          <Body>
            <NativeBaseText>{item.name}</NativeBaseText>
            <NativeBaseText>Grade:</NativeBaseText>
            <NativeBaseText note>{item.grade}</NativeBaseText>
          </Body>
          <Right>
            <NativeBaseText note>{item.created_at}</NativeBaseText>
          </Right>
        </ListItem>
      </List>
    );
  };

  const renderFooter = () => {
    if (refreshBool == false) {
      return null;
    }
    return <ActivityIndicator size="large" />;
  };

  return (
    <>
      <ScrollView
        style={{
          width: '100%',
        }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          marginTop:20,
          width: '100%',
          
        }}>
        {(responseData == '' || responseData == 'loading') && initPager == 1 ? (
          loadAnimation()
        ) : responseData == null ? (
          loadAnimation()
        ) : (
          <FlatList
            data={responseData}
            renderItem={({item, index}) => renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={fetchMore}
            onEndReachedThreshold={0.1}
            onRefresh={handleRefresh}
            ListFooterComponent={renderFooter}
            refreshing={refreshBool}
          />
        )}
      </ScrollView>
    </>
  );
}
