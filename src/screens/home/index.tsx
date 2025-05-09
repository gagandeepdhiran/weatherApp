import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Keyboard,
    Pressable,
    SafeAreaView,
    Switch,
    Text,
    TextInput,
    View,
} from 'react-native';
import { api } from '../../redux/api';
import { useAppSelector } from '../../redux';
import moment from 'moment';
import Icons from '../../constants/icons';
import { useDispatch } from 'react-redux';
import { deleteCity, toggleColorScheme } from '../../redux/homeSlice';
import { styles } from './Home.styles';

const Home = () => {
    const [getWeatherDetails, { isSuccess, isLoading, error, isError }] = api.useLazyGetWeatherDetailsQuery();
    const weatherCities = useAppSelector((state) => state?.home?.weatherCities);
    const colorScheme = useAppSelector((state) => state?.home?.colorScheme);
    const theme = colorScheme === 'dark' ? styles.dark : styles.light;
    const dispatch = useDispatch();
    const [cityName, setCityName] = useState('');

    useEffect(() => {
        if (isSuccess) setCityName('');
    }, [isSuccess]);

    const handleCityNameChange = (e: string) => setCityName(e);

    const handleGetDetailsClicked = () => {
        Keyboard.dismiss();
        getWeatherDetails({ cityName });
    };

    const handleRefreshClicked = (item: any) => {
        getWeatherDetails({ cityName: item?.name });
    };

    const handleDeleteClicked = (item: any) => {
        dispatch(deleteCity({ cityId: item?.id }));
    };

    const handleSwitch = () => {
        dispatch(toggleColorScheme());
    }

    const renderCity = ({ item }: any) => {
        const temp = item?.main?.temp;
        const weather = item?.weather[0]?.main;
        const icon = item?.weather[0]?.icon;
        return (
            <View style={theme.cityCard} testID={`city-card-${item?.id}`}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={theme.cityName}>{item?.name}, {item?.sys?.country}</Text>
                        <Text style={theme.updatedText}>Last updated: {moment(item?.timestamp).format('D MMMM YYYY, h:mma')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Pressable onPress={() => handleRefreshClicked(item)} testID={`refresh-${item?.id}`}>
                            <Icons.Refresh width={24} height={24} color={theme.cityName.color} />
                        </Pressable>
                        <Pressable onPress={() => handleDeleteClicked(item)} testID={`delete-${item?.id}`}>
                            <Icons.Trash width={24} height={24} color={theme.cityName.color} />
                        </Pressable>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={theme.tempText}>{temp}°C</Text>
                        <Text style={theme.weatherText}>{weather}</Text>
                    </View>
                    <Image source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }} style={{ height: 50, width: 50 }} />
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={theme.root} testID="home-screen">
            <View style={{ paddingHorizontal: 16, alignItems: 'center', paddingTop: 20 }}>
                <Text style={theme.heading}>The <Text style={theme.highlight}>Weather</Text> App</Text>
                <View style={{ flexDirection:'row', alignItems:'center', marginTop:10, gap:10 }}>
                    <Text style={theme.toggleText}>Light Mode</Text>
                    <Switch
                        onChange={handleSwitch}
                        value={colorScheme === 'dark'}
                        testID="color-scheme-switch"
                    />
                    <Text style={theme.toggleText}>Dark Mode</Text>
                </View>
            </View>
            <View style={{ flex: 1, marginTop: 30, paddingHorizontal: 16 }}>
                <View>
                    <View style={theme.inputWrapper}>
                        <TextInput
                            placeholder="Enter a city name..."
                            placeholderTextColor={'#AAAAAA'}
                            onChangeText={handleCityNameChange}
                            value={cityName}
                            style={theme.inputText}
                            returnKeyType="done"
                            onSubmitEditing={handleGetDetailsClicked}
                            testID="city-input"
                        />
                    </View>
                    {isError && (
                        <Text style={theme.errorText} testID="error-message">
                            {error?.data?.message}
                        </Text>
                    )}
                    <Pressable
                        disabled={isLoading}
                        onPress={handleGetDetailsClicked}
                        style={theme.button}
                        testID="get-details-button"
                    >
                        {isLoading ? (
                            <ActivityIndicator color={'#000000'} testID="activity-indicator" />
                        ) : (
                            <Text style={theme.buttonText}>Get Details</Text>
                        )}
                    </Pressable>
                </View>
                <FlatList
                    data={weatherCities}
                    renderItem={renderCity}
                    keyExtractor={(item) => String(item?.id)}
                    showsVerticalScrollIndicator={false}
                    testID="city-list"
                    ListHeaderComponent={
                        <Text style={theme.sectionTitle}>Cities ({weatherCities.length})</Text>
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default Home;