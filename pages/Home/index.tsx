import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface IBook {
  id: number,
  title?: string,
  author?: string
}

const Home = () => {
 
  const [data, setData] = useState<IBook[]>([]);
  const booksList: IBook[] = [...data];

  
  const url = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=Vq52xCq4FyIwIjar9X1IZFKaVKv1hag6"

 const getBooks = () => {
  //const booksList: IBook[] = [...data];
    fetch(url)
    .then(response => response.json())
    .then( response =>
      response.results.books.map((book: any)=> {
      //  console.log(booksList)
      //  console.log(data)
      //let booksList: IBook[] = [...data];
        booksList.push({"id": book.rank, "title": book.title, "author": book.author})
        setData(booksList)
        //setData( {...data, "title": book.title, "author": book.author});
      })
    ).catch(error => console.log(error.message))
  }

  useEffect(() => {
    getBooks();
    //console.log(data)
  }, [])
  
  return (
    <View style={styles.container}>
      
      <ScrollView >
      <Text style={{backgroundColor: 'green'}}>Hello World ! </Text>
      {data.map(book => {
       return(
        <View key={`indexs${book.id}`}>
          <Text >{book.id}</Text>
          <Text key={`indexss${book.id}`}>{book.title}</Text>
          <Text key={`indexsss${book.id}`}>{book.author}</Text>
        </View>
      )})}
      {/* {data.map(book => {
      return (
        
            <Text key={`index${book.id}`}>{book.title}</Text>
        )
      })}  */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;