import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    bg: {
        resizeMode: 'cover',
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    listItem: {
        height: 60,
        borderWidth: 0.2,
        width: '100%',
        backgroundColor: 'transparent',
        justifyContent: 'center'
    },
    listMainText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '600'
    },
    listSubText: {
        textAlign: 'center',
        fontSize: 10,
        fontWeight: '400'
    },
    chessButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    },
    menuDiv: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        marginLeft: '15%',
        padding: 20,
        borderRadius: 10,
        marginTop: '50%',
        width: '70%',
        justifyContent: 'center'
    },
    menuItem: {
        height: 50,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 255, 0, 0.15)'
    }

});