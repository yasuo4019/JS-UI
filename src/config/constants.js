const Constants = {
    view: {
        analyses: {
            title: "Analyses (View)",
            url: {
                root: 'analyses',
            },
            key: 'analysisId',
            cols: [
                { title: 'Name', key: 'name' },
                { title: 'Date', key: 'date' },
                { title: 'Description', key: 'description' },
                { title: 'Interface', key: 'interface' },
            ]
        },
        analysesResults: {
            title: "Analyses results (View)",
            url: {
                root: 'analyses/results',
            },
            key: 'analysisResultId',
            getKey: item => item.analysisResultId,
            cols: [
                { title: 'Name', key: 'analysisName' },
                { title: 'Date', key: 'date' },
                { title: 'Type', key: 'resultsType' },
                { title: 'Result', key: 'result' },
                { title: 'File', key: 'fileName' },
                { title: 'Description', key: 'analysisDescription' },
                { title: 'Reference', key: 'referenceDataName' },
            ]
        },
        samples: {
            title: "Samples (View)",
            url: {
                root: 'samples',
            },
            key: 'sampleId',
            cols: [
                { title: 'Patient ID', key: 'patientID' },
                { title: 'Submitter', key: 'submitter' },
                { title: 'Submission ID', key: 'submissionID' },
                { title: 'NGS type', key: 'ngsType' },
                { title: 'HGSV type', key: 'hgsvType' },
                { title: 'Protocol', key: 'protocol' },
                { title: 'Target', key: 'target' },
                { title: 'Sex', key: 'sex' },
                { title: 'Age', key: 'age' },
                { title: 'Diagnosis', key: 'diagnosis' },
            ]
        },
        rawdata: {
            title: "Raw data (View)",
            url: {
                root: 'rawdata',
            },
            key: 'rawDataId',
            cols: [
                { title: 'File Name', key: 'fileName' },
                { title: 'R1', key: 'r1' },
                { title: 'R2', key: 'r2' },
                { title: 'Equipment', key: 'equipment' },
                { title: 'Submitter', key: 'submitter' },
                { title: 'Submission ID', key: 'submissionId' },
                { title: 'NGS type', key: 'ngsType' },
                { title: 'Protocol', key: 'protocol' },
                { title: 'HGSV type', key: 'hgsvType' },
                { title: 'Target', key: 'target' },
            ]
        },
    },
    table: {
        analyses: {
            isEditable: true,
            title: "Analyses",
            url: {
                root: 'analyses',
            },
            key: 'analysisId',
            cols: [
                { title: 'Name', key: 'name' },
                { title: 'Date', key: 'date' },
                { title: 'Description', key: 'description' },
            ]
        },
        results: {
            title: "Analyses results",
            url: {
                root: 'results',
            },
            key: 'resultId',
            cols: [
                { title: 'Config', key: 'config' },
                { title: 'Type', key: 'type' },
                { title: 'Result content', key: 'resultContent' },
            ]
        },
        samples: {
            isEditable: true,
            title: "Samples",
            url: {
                root: 'samples',
            },
            key: 'sampleId',
            cols: [
                { title: 'Patient', key: 'patient', dependency: 'patients' },
                { title: 'Submitter', key: 'submitter' },
                { title: 'Submission ID', key: 'submissionId' },
                { title: 'Ngs type', key: 'ngsType' },
                { title: 'Target', key: 'target', dependency: 'targets' },
                { title: 'Hgsv type', key: 'hgsvType', dependency: 'hgsvTypes' },
                { title: 'Protocol', key: 'protocol' },
            ],
            dependencies: ['patients', 'targets', 'hgsvTypes']
        },
        rawdata: {
            isEditable: true,
            title: "Raw data",
            url: {
                root: 'rawdata',
            },
            key: 'rawDataId',
            cols: [
                { title: 'Name', key: 'name' },
                { title: 'R1', key: 'r1' },
                { title: 'R2', key: 'r2' },
                { title: 'Sample', key: 'sample', dependency: 'samples' },
                { title: 'Equipment', key: 'equipment', dependency: 'equipment' },
            ],
            dependencies: ['samples', 'equipment']
        },
        patients: {
            isEditable: true,
            title: 'Patients',
            url: {
                root: 'patients',
            },
            key: 'patientId',
            cols: [
                { title: 'ID', key: 'id' },
                { title: 'Sex', key: 'sex' },
                { title: 'Age', key: 'age' },
                { title: 'Diagnosis', key: 'diagnosis' },
            ]
        },
        targets: {
            isEditable: true,
            title: 'Targets',
            url: {
                root: 'targets',
            },
            key: 'targetId',
            cols: [
                { title: 'Target', key: 'value' },
            ]
        },
        hgsvTypes: {
            isEditable: true,
            title: 'HGSV types',
            url: {
                root: 'hgsv/types',
            },
            key: 'hgsvTypeId',
            cols: [
                { title: 'Type', key: 'type' },
            ]
        },
        equipment: {
            isEditable: true,
            title: 'Equipment',
            url: {
                root: 'equipment',
            },
            key: 'equipmentId',
            cols: [
                { title: 'Name', key: 'name' },
                { title: 'Description', key: 'description' },
            ]
        },
        analysesConfigurations: {
            title: 'Analyses Configuration',
            url: {
                root: 'analyses/configurations',
            },
            key: 'analysisConfigurationId',
            cols: [
                { title: 'Analysis name', key: 'analysis' },
                { title: 'RawData name', key: 'rawData' },
            ]
        },
        resultTypes: {
            isEditable: true,
            title: 'Result types',
            url: {
                root: 'result/types',
            },
            key: 'resultTypeId',
            cols: [
                { title: 'Type', key: 'type' },
            ]
        },
        referenceData: {
            isEditable: true,
            title: 'Reference data',
            url: {
                root: 'reference/data',
            },
            key: 'referenceDataId',
            cols: [
                { title: 'Name', key: 'name' },
                { title: 'FileName', key: 'fileName' },
            ]
        }
    }
};

export default Constants;