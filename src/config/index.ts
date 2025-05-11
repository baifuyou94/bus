interface LicenseType {
    key: string;
    label: string;
    rate: number;
}

const LICENSE_TYPE: LicenseType[] = [
    {key: 'NP', label: '个人授权', rate: 1},
    {key: 'LP', label: '企业授权', rate: 4},
    {key: 'LPPLUS', label: '企业plus', rate: 10},
]

const LICENSE_TYPE_MAP: Record<string, LicenseType> = {};

LICENSE_TYPE.forEach((item) => {
    LICENSE_TYPE_MAP[item.key] = item;
});

export {
    LICENSE_TYPE,
    LICENSE_TYPE_MAP,
}
