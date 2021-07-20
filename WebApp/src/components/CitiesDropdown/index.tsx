import React from "react";
import { Dropdown } from "semantic-ui-react";
import citiesList from "./cities";

let cities = citiesList.map((city, index) => {
  return { key: index, text: city, value: city };
});

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const CitiesDropdown: React.FC<Props> = props => (
  <Dropdown
    placeholder="Município"
    fluid
    search
    selection
    value={props.value}
    onChange={(_, { value }) => props.onChange(`${value}`)}
    options={cities}
  />
);

export default CitiesDropdown;
