import PrimaryNav from "../components/PrimaryNav";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from "react";
import environment from "../environment";

 

function Home() {
 
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);

  useEffect(()=>{
    getProducts();
  }, []);

  
  function getProducts(){
    fetch(`${environment.api}/products`)
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      const products = res.map((product)=>{product.selected=false;
        return product;
      })
      setProducts(products);
      setData(products);
    })
    .catch((err)=>console.log(err))
    .finally(()=>console.log("API call is completed"))
  }

  function onSearched(term){
      console.log(term);
      if (!term){
        setData(data);
        return
      }
      const filtered = data.filter((item)=>{
          const titleLowerCased = item.title.toLowerCase();
          const termLowerCased = term.toLowerCase();
          return titleLowerCased.indexOf(termLowerCased)!= -1;
      })
      setProducts(filtered);
  }

  //const products = ["a", "b", "c"]
  function renderCols(){
    return products.map(function(product, index){
      return (
        <>


        <Col md={4} lg={3} key={index}>
        <ProductCard item={product} reload={getProducts}/> 
     
        </Col>
        </>
        
          // here reload is used because when we delete a card automatically the page should load and delete that particular card in UI
      
      )
    })
  }
  return (
    <>
   
    
    <Search onSearched = {onSearched}/>
    <Container>
      <Row>
       {renderCols()}
      </Row>
    
    </Container>
    
   

    
    </>
  );
}

export default Home;
