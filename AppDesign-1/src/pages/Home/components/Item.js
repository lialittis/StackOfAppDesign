const Item = ({ id, note, date, time, deleteData, submittingStatus}) => {
  
  function deleteItem () {
      submittingStatus.current = true
      deleteData(function(prev){
          return prev.filter(item => item.id !== id)
      })
  }
  return (
    <div className="item">
      <div>
        <p>{id}</p>
        <p>{note}</p>
        <p>{date}</p>
        <p>{time}</p>
      </div>
      <button onClick={deleteItem} className="remove">删除</button>
    </div>
  );
};

export default Item;
