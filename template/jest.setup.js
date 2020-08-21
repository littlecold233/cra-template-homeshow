import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document
    }
});

Enzyme.configure({ adapter: new Adapter() });
