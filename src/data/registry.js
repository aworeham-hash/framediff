import nistCsf from '../../data/frameworks/nist-csf/nist-csf.json'
import nistSp80053 from '../../data/frameworks/nist-sp800-53/nist-sp800-53.json'
import pciDss from '../../data/frameworks/pci-dss/pci-dss.json'
import iso27001 from '../../data/frameworks/iso-27001/iso-27001.json'
import soc2 from '../../data/frameworks/soc2/soc2.json'
import hipaa from '../../data/frameworks/hipaa/hipaa.json'
import sox from '../../data/frameworks/sox/sox.json'
import irs4812 from '../../data/frameworks/irs-4812/irs-4812.json'
import stigs from '../../data/frameworks/stigs/stigs.json'
import nistSp800171 from '../../data/frameworks/nist-sp800-171/nist-sp800-171.json'
import cmmc from '../../data/frameworks/cmmc/cmmc.json'
import nydfs500 from '../../data/frameworks/nydfs-500/nydfs-500.json'

export const frameworksData = {
  'nist-csf': nistCsf,
  'nist-sp800-53': nistSp80053,
  'pci-dss': pciDss,
  'iso-27001': iso27001,
  'soc2': soc2,
  'hipaa': hipaa,
  'sox': sox,
  'irs-4812': irs4812,
  'stigs': stigs,
  'nist-sp800-171': nistSp800171,
  'cmmc': cmmc,
  'nydfs-500': nydfs500,
}

export function getFramework(id) {
  return frameworksData[id] || null
}

export function getDefaultTransition(framework) {
  if (!framework?.transitions) return null
  const keys = Object.keys(framework.transitions)
  return keys[keys.length - 1] // default to most recent transition
}
