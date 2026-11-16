// navbar-simple as the registry and the block contract know it: the component and its spec (props schema in zod, default content).
// A page that only renders the header imports the component alone, '@klarhimmel/ui/blocks/navbar-simple/component': no zod in its bundle.
export { default } from './component';
export { spec } from './spec';
