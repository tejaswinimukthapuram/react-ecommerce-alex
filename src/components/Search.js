import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Search(props) {
  function onSearch(event){
    //console.log(event.target.value);
    props.onSearched(event.target.value);
  }
    return (
      <>
      <Container>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search"
          onKeyUp={(event)=>onSearch(event)}
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2"><span className="material-icons-outlined">
search
</span></InputGroup.Text>
      </InputGroup>
      </Container>
      </>
    );
  }
  
  export default Search;