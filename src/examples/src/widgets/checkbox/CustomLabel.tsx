import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Checkbox from '@dojo/widgets/checkbox';

const factory = create({ icache });

export default factory(function CustomLabelRenderer({ middleware: { icache } }) {
	const checked = icache.getOrSet('checked', false);
	return (
		<Checkbox
			checked={checked}
			onValue={(checked) => {
				icache.set('checked', checked);
			}}
		>
			<span styles={{ fontWeight: 'bold', fontStyle: 'italic' }}>Custom Label</span>
		</Checkbox>
	);
});
