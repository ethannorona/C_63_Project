import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component {

  constructor(){
    super();

    this.state={
      text:'',
      isSearchingPressed: false,
      word: "",
      lexicalCategory: '',
      examples: [],
      defination: ""
}
  }

  getWord = (word) => {
    var searchKeyWord = word.toLowerCase();
    var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyWord + ".json"
    //console.log(url)
    return fetch(url)
    .then((data)=>{
      if(data.status === 200){
        return data.json()
      }
      else{
        return null
      }
    })
    .then((response)=>{
      //console.log(response)

      var responseObject = response;
      //var word = responseObject.word;
      //var lexicalCategory = responseObject.results[0].lexicalEntries[0].lexicalCategory.text;
      if(responseObject){
        var wordData = responseObject.definitions[0]
        //console.log(responseObject.definitions[0])
        var definition = wordData.description
        var lexicalCategory = wordData.wordtype
        //console.log(lexicalCategory)
        this.setState({
          "word": this.state.text,
          "definition": definition,
          "lexicalCategory": lexicalCategory
        })
      }
      else{
        this.setState({
          "word": this.state.text,
          "definition": "Not Found"
        })
      }
    })
  }

  render() {
    return (
      <View>
        <Header 
          backgroundColor={'purple'}
          centerComponent={{text:'Pocket Dictonary', style:{color:'white', fontSize:20}}} />
        <View style={styles.container}>
          <TextInput 
           style={styles.inputBox}
           onChangeText={text=>{
            this.setState({
              text:text,
              isSearchingPressed: false,
              word: "Loading...",
              lexicalCategory: '',
              examples: [],
              defination: ""
            });
          }}
          value={this.state.text}
         />
         <TouchableOpacity style={styles.goButton} 
          onPress = {() => {
            this.setState({ isSearchingPressed:true }),
            this.getWord(this.state.text)
          }}>
          <Text style={styles.buttonText}>Search</Text>
         </TouchableOpacity>
          <Text style = {styles.text}>
            Word : {" "}
          </Text>
          <Text style={{fontSize:18}}>
            {this.state.word}
          </Text>
        </View>
        <View style={styles.container}>
          <Text style = {styles.text}>
            Type : {" "}
          </Text>
          <Text style={{fontSize:18}}>
            {this.state.lexicalCategory}
          </Text>
        </View>
        <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
          <Text style = {styles.text}>
            Definition : {" "}
          </Text>
          <Text style={{fontSize:18}}>
            {this.state.definition}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1
  }, 
  inputBox: { 
    marginTop: 30, 
    width: '80%', 
    alignSelf: 'center', 
    height: 40, 
    textAlign: 'center', 
    borderWidth: 4, 
    outline: 'none', 
  }, 
  goButton: { 
    width: '50%', 
    height: 50, 
    alignSelf: 'center',
    padding: 1, 
    margin: 20,
    borderWidth: 3,
    borderRadius: 15 
  }, 
  buttonText: { 
    textAlign: 'center', 
    fontSize: 30,
    fontWeight: 'bold', 
  },
  text: {
    color: 'gold',
    fontWeight: 'bold',
    fontSize: 18
  }
});