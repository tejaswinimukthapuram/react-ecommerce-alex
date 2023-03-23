

function PriceTag(props) {

    function formatPrice(price){
        return parseFloat(price).toFixed(2);
    }
    return (
      <>
      <div>
      <span className="material-icons-outlined">
currency_rupee
</span>
{formatPrice(props.price)}
      </div>
      </>
    );
  }
  
  export default PriceTag;
  