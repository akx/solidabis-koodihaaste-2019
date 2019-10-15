interface ShiftTable {
  [s: string]: string;
}

interface ShiftTables {
  tables: ShiftTable[];
  maxShift: number;
}

function generateShiftTables(keyspaces: readonly string[]): ShiftTables {
  const maxShift = keyspaces[0].length;
  const tables = [];
  for (let shift = 0; shift < maxShift; shift++) {
    const shiftTable: ShiftTable = {};
    keyspaces.forEach(keyspace => {
      for (let i = 0; i < keyspace.length; i++) {
        shiftTable[keyspace[i]] = keyspace[(i + shift) % keyspace.length];
      }
    });
    tables.push(shiftTable);
  }
  return { tables, maxShift };
}

export const finnishShiftTables = generateShiftTables([
  "abcdefghijklmnopqrstuvwxyzåäö",
  "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ",
]);

export const caesar = (s: string, shift: number, shiftTables: ShiftTables) => {
  if (shift < 0 || shift >= shiftTables.maxShift) {
    throw new Error("Invalid shift value.");
  }
  const shiftTable = shiftTables.tables[shift];
  const chars = [];
  for (let i = 0; i < s.length; i++) {
    chars.push(shiftTable[s[i]] || s[i]);
  }
  return chars.join("");
};
