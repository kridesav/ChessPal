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
        height: 90,
        marginTop: 5,
        width: '100%',
        justifyContent: 'center'
    },
    listItem2: {
        minHeight: 100,
        marginTop: 5,
        width: '100%',
        justifyContent: 'center',
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
        borderRadius: 10,
        marginTop: 10,
    },
    menuDiv: {
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
    },
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        alignItems: "center",
        padding: 20,
    },
    nameSubText: {
        fontSize: 16,
        marginLeft: 10,
    },
    bottomlist: {
        width: "100%",
        marginTop: 30,
        borderRadius: 10,
    },
    input: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    button: {
        justifyContent: "flex-start",
        padding: 8,
        marginTop: 10,
    },

    bottomlist2: {
        width: "100%",
        borderRadius: 10,
        paddingBottom: 10,
    },
    bottomlist3: {
        width: "100%",
        borderRadius: 10,
        paddingBottom: 10,
        marginTop: 10,
        paddingTop: 10,
    },
    chip: {
        margin: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chip2: {
        margin: 2,
        borderRadius: 10,
        
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 10,
    },
    

});