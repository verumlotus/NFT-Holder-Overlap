import { VennDiagram, asSets } from '@upsetjs/react'
import { useState, useMemo } from 'react'

type SetData = {
    name: string,
    elems: string[]
}

export default function CustomizedVennDiagram(props: any) {
    const vennDiagramSetData: SetData[] = props.vennDiagramSetData
    const setDataForTable: any = props.setDataForTable
    const setIntersectionName: any = props.setIntersectionName

    function handleSelectionClick(set: SetData) {
        const tableData: {'id': string}[] = []
        set.elems.forEach((v) => tableData.push({id: v}))
        setIntersectionName(set.name)
        setDataForTable(tableData)
    }

    const dataToUse = useMemo(() => {
        const colors = ['#f47560', '#61cdbb', '#75975e', '#f1e15b', '#e8a838', '#97e3d5'];
        return asSets(vennDiagramSetData).map((s, i) => ({ ...s, color: colors[i % colors.length] }));
    }, [vennDiagramSetData])

    return (
        <VennDiagram
          sets={dataToUse}
          width={window.innerWidth}
          height={400}
          onClick={handleSelectionClick as any}
        //   selection={selection}
        //   onHover={setSelection as any}
        />
    );
}
