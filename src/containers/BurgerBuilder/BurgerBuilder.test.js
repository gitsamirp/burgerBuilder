import { BurgerBuilder } from './BurgerBuilder';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildContols from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}></BurgerBuilder>);
    });

    it('should render build controls whem recieving ingredients', () => {
        wrapper.setProps({ings: {salad:0}})
        expect(wrapper.find(BuildContols)).toHaveLength(1);
    });
});