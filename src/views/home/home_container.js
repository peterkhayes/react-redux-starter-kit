import React        from "react";
import {connect}    from "react-redux";

import {fetchItems} from "action_creators/example";

function mapStateToProps (state) {
  return {
    query: state.example.query,
    items: state.example.items
  };
}

@connect(mapStateToProps)
export default class HomeContainer extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    query: React.PropTypes.string,
    items: React.PropTypes.arrayOf(React.PropTypes.string),
  };

  componentWillMount () {
    this.props.dispatch(fetchItems("My Search Query"));
  }

  render () {
    const {query, items} = this.props;

    if (items == null) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Results for "{query}"</h1>
        <ul>
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    );
  }

}