import * as assert from 'assert';
import { Memory, MAX_MEM_SIZE } from '../memory';


suite('Memory', () => {

	setup( () => {
		//Settings.Init(<any>undefined, '');
	});

/*
	teardown( () => dc.stop() );
*/

	test('Constructor', () => {
		let mem = new Memory();
		assert.equal(mem.getValueAt(10), 0);
	});

	test('Set 1 memory area', () => {
		let mem = new Memory();

		let area1 = [1,2,3,4,5,6,7,8,9,10];
		let org1 = 100;
		mem.setMemory(org1, new Uint8Array(area1));

		// before 1rst area
		let addr = 0;
		for(;addr<org1; addr++) {
			assert.equal(mem.getValueAt(addr), 0);
		}

		// 1rst area
		for(let i=0; i<area1.length; i++) {
			assert.equal(mem.getValueAt(addr), area1[i]);
			addr++;
		}

		// Remaining
		for(;addr<0x10000; addr++) {
			assert.equal(mem.getValueAt(addr), 0);
		}
	});

	test('Set 2 memory areas', () => {
		let mem = new Memory();

		let area1 = [1,2,3,4,5,6,7,8,9,10];
		let org1 = 100;
		mem.setMemory(org1, new Uint8Array(area1));

		let area2 = [11,12,13,14,15,16,17,18,19,20];
		let org2 = 200;
		mem.setMemory(org2, new Uint8Array(area2));

		// before 1rst area
		let addr = 0;
		for(;addr<org1; addr++) {
			assert.equal(mem.getValueAt(addr), 0);
		}

		// 1rst area
		for(let i=0; i<area1.length; i++) {
			assert.equal(mem.getValueAt(addr), area1[i]);
			addr++;
		}

		// in between
		for(;addr<org2; addr++) {
			assert.equal(mem.getValueAt(addr), 0);
		}

		// 2nd area
		for(let i=0; i<area2.length; i++) {
			assert.equal(mem.getValueAt(addr), area2[i]);
			addr++;
		}

		// Remaining
		for(;addr<0x10000; addr++) {
			assert.equal(mem.getValueAt(addr), 0);
		}
	});

	test('Reading bin file', () => {
		let mem = new Memory();

		let org1 = 1000;
		let length = 6;
		mem.readBinFile(org1, './src/tests/data/memory1.bin');

		// before 1rst area
		let addr = 0;
		for(;addr<org1; addr++) {
			assert.equal(mem.getValueAt(addr), 0);
		}

		// 1rst area
		let value = 0x31;	// Values of the bin file
		for(let i=0; i<length; i++) {
			assert.equal(mem.getValueAt(addr), value);
			value++;	// Next value from bin file
			addr++;
		}

		// Remaining
		for(;addr<MAX_MEM_SIZE; addr++) {
			assert.equal(mem.getValueAt(addr), 0);
		}
	});

});
