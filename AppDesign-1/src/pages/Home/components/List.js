import Item from "./Item";

/*const arr = [1,2,3]*/

const List = ({ listData, deleteData,submittingStatus }) => {
  return (
    <div className="list">
      {listData.map((item) => {
        const { id, note, date, time } = item;
        return (
          <Item
            key={id}
            id={id}
            note={note}
            date={date}
            time={time}
            deleteData={deleteData}
            submittingStatus={submittingStatus}
          />
        );
      })}
      {/*arr.map(item => <Item />)*/}
    </div>
  );
};

export default List;
