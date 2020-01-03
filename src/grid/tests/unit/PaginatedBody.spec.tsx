const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { v, w } from '@dojo/framework/core/vdom';

import * as fixedCss from '../../styles/body.m.css';
import * as css from '../../../theme/default/grid-body.m.css';
import PaginatedBody from '../../PaginatedBody';
import PlaceholderRow from '../../PlaceholderRow';
import Row from '../../Row';

const noop = () => {};

describe('PaginatedBody', () => {
	it('should render with placeholders', () => {
		const h = harness(() =>
			w(PaginatedBody, {
				pageSize: 100,
				height: 400,
				pageNumber: 1,
				pages: {},
				columnConfig: [] as any,
				fetcher: noop,
				updater: noop,
				onScroll: noop
			})
		);

		let rows: any[] = [];
		for (let i = 0; i < 100; i++) {
			rows.push(w(PlaceholderRow, { key: i }));
		}

		h.expect(() =>
			v(
				'div',
				{
					key: 'root',
					classes: [css.root, fixedCss.rootFixed],
					role: 'rowgroup',
					onscroll: noop,
					styles: { height: '400px' }
				},
				[v('div', { styles: {} }, [v('div'), ...rows])]
			)
		);
	});

	it('should render with rows', () => {
		const rows: any[] = [];
		const page: any[] = [];
		for (let i = 0; i < 100; i++) {
			const item = { id: 'id' };
			page.push(item);
			rows.push(
				w(Row, {
					id: i,
					key: i,
					item,
					columnConfig: [],
					updater: noop,
					classes: undefined,
					theme: undefined,
					columnWidths: undefined
				})
			);
		}

		const h = harness(() =>
			w(PaginatedBody, {
				pageSize: 100,
				height: 400,
				pageNumber: 1,
				pages: {
					'page-1': page
				},
				columnConfig: [],
				fetcher: noop,
				updater: noop,
				onScroll: noop
			})
		);

		h.expect(() =>
			v(
				'div',
				{
					key: 'root',
					classes: [css.root, fixedCss.rootFixed],
					role: 'rowgroup',
					onscroll: noop,
					styles: { height: '400px' }
				},
				[v('div', { styles: {} }, [v('div'), ...rows])]
			)
		);
	});

	it('should render with set widths', () => {
		const rows: any[] = [];
		const page: any[] = [];
		for (let i = 0; i < 100; i++) {
			const item = { id: 'id' };
			page.push(item);
			rows.push(
				w(Row, {
					id: i,
					key: i,
					item,
					columnConfig: [],
					updater: noop,
					classes: undefined,
					theme: undefined,
					columnWidths: {
						id: 400,
						name: 400
					}
				})
			);
		}

		const h = harness(() =>
			w(PaginatedBody, {
				pageSize: 100,
				height: 400,
				width: 500,
				pageNumber: 1,
				pages: {
					'page-1': page
				},
				columnConfig: [],
				columnWidths: {
					id: 400,
					name: 400
				},
				fetcher: noop,
				updater: noop,
				onScroll: noop
			})
		);

		h.expect(() =>
			v(
				'div',
				{
					key: 'root',
					classes: [css.root, fixedCss.rootFixed],
					role: 'rowgroup',
					onscroll: noop,
					styles: { height: '400px', width: '500px' }
				},
				[v('div', { styles: { width: '800px' } }, [v('div'), ...rows])]
			)
		);
	});
});
