import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Switch from '@dojo/widgets/switch';

const factory = create({ icache });

export default factory(function Basic({ middleware: { icache } }) {
	const switched = icache.getOrSet('switched', false);
	return (
		<Switch
			value={switched}
			name="Switch"
			onValue={(value) => {
				icache.set('switched', value);
			}}
		>
			{{ label: 'On/Off' }}
		</Switch>
	);
});
