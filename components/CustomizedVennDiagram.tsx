import { VennDiagram, asSets } from '@upsetjs/react'
import { useState, useMemo } from 'react'

type SetData = {
    name: string,
    elems: string[]
}

export default function CustomizedVennDiagram(props: any) {
    const vennDiagramSetData: SetData[] = props.vennDiagramSetData
    const [selection, setSelection] = useState(null);

    const dataToUse = useMemo(() => {
        const colors = ['#f47560', '#61cdbb', '#75975e', '#f1e15b', '#e8a838', '#97e3d5'];
        return asSets(vennDiagramSetData).map((s, i) => ({ ...s, color: colors[i % colors.length] }));
    }, [vennDiagramSetData])

    return (
        <VennDiagram
          sets={dataToUse}
          width={780}
          height={400}
        //   selection={selection}
        //   onHover={setSelection as any}
        />
    );
}
